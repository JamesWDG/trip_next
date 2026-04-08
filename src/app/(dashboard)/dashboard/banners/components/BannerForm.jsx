"use client";

import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { uploadBannerImages } from "@/services/bannerService";

const FLOWS = [
  { value: "food", label: "Food delivery" },
  { value: "ride", label: "Ride / cab" },
  { value: "hotel", label: "Hotels / stay" },
];

const MAX_FILES = 15;
const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

function emptyState() {
  return {
    flow: "food",
    imageUrl: "",
    title: "",
    subtitle: "",
    linkUrl: "",
    sortOrder: "0",
    isActive: true,
  };
}

function fromRow(row) {
  if (!row) return emptyState();
  return {
    flow: row.flow === "ride" || row.flow === "hotel" ? row.flow : "food",
    imageUrl: row.imageUrl ?? "",
    title: row.title ?? "",
    subtitle: row.subtitle ?? "",
    linkUrl: row.linkUrl ?? "",
    sortOrder:
      row.sortOrder != null && row.sortOrder !== ""
        ? String(row.sortOrder)
        : "0",
    isActive: !!row.isActive,
  };
}

/**
 * @param {object} values
 * @param {string} [imageUrlOverride]
 */
export function buildBannerPayload(values, imageUrlOverride) {
  const urlRaw =
    imageUrlOverride != null ? imageUrlOverride : values.imageUrl;
  const url = String(urlRaw ?? "").trim();
  const sort =
    values.sortOrder === "" || values.sortOrder == null
      ? 0
      : Number(values.sortOrder);
  return {
    flow: values.flow,
    imageUrl: url,
    title: values.title?.trim() ? values.title.trim() : null,
    subtitle: values.subtitle?.trim() ? values.subtitle.trim() : null,
    linkUrl: values.linkUrl?.trim() ? values.linkUrl.trim() : null,
    sortOrder: Number.isNaN(sort) ? 0 : sort,
    isActive: values.isActive,
  };
}

/**
 * @param {object} props
 * @param {object | null} [props.initialData]
 * @param {(payload: object | object[]) => Promise<void>} props.onSubmit — single banner or batch (create)
 * @param {() => void} [props.onCancel]
 * @param {boolean} props.saving
 * @param {string} props.submitLabel
 * @param {boolean} [props.embedded]
 */
export function BannerForm({
  initialData = null,
  onSubmit,
  onCancel,
  saving,
  submitLabel,
  embedded = false,
}) {
  const { error } = useToast();
  const [values, setValues] = useState(() => fromRow(initialData));
  const [pendingFiles, setPendingFiles] = useState([]);
  const [replaceFile, setReplaceFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);

  const isEdit = initialData != null;
  const busy = saving || uploading;

  useEffect(() => {
    setValues(fromRow(initialData));
    setPendingFiles([]);
    setReplaceFile(null);
  }, [initialData]);

  const set = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  const clearFiles = () => {
    setPendingFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addImageFiles = (fileList) => {
    const list = Array.from(fileList || []).filter((f) =>
      /^image\//i.test(f.type),
    );
    if (!list.length) return;
    const next = [...pendingFiles, ...list].slice(0, MAX_FILES);
    setPendingFiles(next);
    setValues((prev) => ({ ...prev, imageUrl: "" }));
  };

  const onPickFiles = (e) => {
    addImageFiles(e.target.files);
    e.target.value = "";
  };

  const onDropFiles = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    addImageFiles(e.dataTransfer?.files);
  };

  const removeFileAt = (idx) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const onPickReplace = (e) => {
    const f = e.target.files?.[0];
    setReplaceFile(f || null);
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      let imageUrl = values.imageUrl.trim();
      if (replaceFile) {
        setUploading(true);
        try {
          const [u] = await uploadBannerImages([replaceFile]);
          imageUrl = u;
        } catch (err) {
          error(err?.message || "Upload failed");
          return;
        } finally {
          setUploading(false);
        }
      }
      if (!imageUrl) {
        error("Image URL or a new image file is required");
        return;
      }
      await onSubmit(buildBannerPayload(values, imageUrl));
      return;
    }

    if (pendingFiles.length > 0) {
      setUploading(true);
      try {
        const urls = await uploadBannerImages(pendingFiles);
        const baseSort = Number(values.sortOrder) || 0;
        const payloads = urls.map((url, i) => ({
          ...buildBannerPayload(values, url),
          sortOrder: baseSort + i,
        }));
        await onSubmit(payloads.length === 1 ? payloads[0] : payloads);
      } catch (err) {
        error(err?.message || "Upload failed");
      } finally {
        setUploading(false);
      }
      return;
    }

    error("Select at least one image from your device");
    return;
  };

  const formInner = (
    <form className="food-promo-form" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Flow / category</label>
          <select
            className="form-select"
            value={values.flow}
            onChange={set("flow")}
          >
            {FLOWS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <span className="form-text small text-muted">
            Which app home this banner appears on (food, ride, or hotels).
          </span>
        </div>
        <div className="col-md-6">
          <label className="form-label">Sort order</label>
          <input
            className="form-control"
            type="number"
            step="1"
            value={values.sortOrder}
            onChange={set("sortOrder")}
            placeholder="0"
          />
          <span className="form-text small text-muted">
            {isEdit
              ? "Lower numbers show first within the same flow."
              : "Starting order; multiple uploads get 0, 1, 2… after this base."}
          </span>
        </div>

        <div className="col-12">
          <label className="form-label">
            {isEdit ? "Image" : "Banner images (from device)"}
          </label>
          {!isEdit ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT}
                multiple
                className="d-none"
                id="banner-files-input"
                onChange={onPickFiles}
              />
              <div
                className={`rounded-3 border border-2 p-4 mb-3 text-center ${
                  dragOver
                    ? "border-primary bg-primary bg-opacity-10"
                    : "border-secondary border-opacity-25 bg-light"
                }`}
                style={{ cursor: busy ? "not-allowed" : "pointer" }}
                onClick={() => !busy && fileInputRef.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault();
                  if (!busy) setDragOver(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!busy) setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={busy ? undefined : onDropFiles}
              >
                <p className="mb-2 fw-semibold text-body">
                  Upload from your device
                </p>
                <p className="small text-muted mb-3 mb-md-2">
                  Drag and drop images here, or tap to choose files (gallery /
                  camera on phone).
                </p>
                <button
                  type="button"
                  className="food-promo-cta food-promo-cta--modal btn-sm px-4 py-2"
                  disabled={busy}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Choose images from device
                </button>
                {pendingFiles.length > 0 ? (
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0"
                      disabled={busy}
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFiles();
                      }}
                    >
                      Clear selected ({pendingFiles.length})
                    </button>
                  </div>
                ) : null}
              </div>
              {pendingFiles.length > 0 ? (
                <ul className="list-unstyled small mb-2 border rounded p-2 bg-light">
                  {pendingFiles.map((f, idx) => (
                    <li
                      key={`${f.name}-${idx}`}
                      className="d-flex justify-content-between align-items-center py-1 gap-2"
                    >
                      <span className="text-truncate" title={f.name}>
                        {f.name}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled={busy}
                        onClick={() => removeFileAt(idx)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="form-text small text-muted d-block mt-2">
                Select up to {MAX_FILES} images to create that many banners at
                once (same title, subtitle, link, flow). Sort order increases by
                1 for each.
              </span>
            </>
          ) : (
            <>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                <input
                  ref={replaceInputRef}
                  type="file"
                  accept={ACCEPT}
                  className="d-none"
                  id="banner-replace-input"
                  onChange={onPickReplace}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  disabled={busy}
                  onClick={() => replaceInputRef.current?.click()}
                >
                  Replace with file from device
                </button>
                {replaceFile ? (
                  <span className="small text-truncate" title={replaceFile.name}>
                    {replaceFile.name}
                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0 ms-1"
                      onClick={() => setReplaceFile(null)}
                    >
                      Clear
                    </button>
                  </span>
                ) : null}
              </div>
              <label className="form-label small text-muted mb-1">
                Image URL
              </label>
              <input
                className="form-control"
                value={values.imageUrl}
                onChange={set("imageUrl")}
                placeholder="https://…"
              />
            </>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Title (optional)</label>
          <input
            className="form-control"
            value={values.title}
            onChange={set("title")}
            placeholder="Headline"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Subtitle (optional)</label>
          <input
            className="form-control"
            value={values.subtitle}
            onChange={set("subtitle")}
            placeholder="Supporting line"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Link URL (optional)</label>
          <input
            className="form-control"
            value={values.linkUrl}
            onChange={set("linkUrl")}
            placeholder="Deep link or web URL when the banner is tapped"
          />
        </div>
        <div className="col-12">
          <div className="food-promo-form-check form-check">
            <input
              id="banner-active-field"
              className="form-check-input"
              type="checkbox"
              checked={values.isActive}
              onChange={set("isActive")}
            />
            <label className="form-check-label" htmlFor="banner-active-field">
              Active (shown in the app when on)
            </label>
          </div>
        </div>
      </div>
      <div
        className={`d-flex flex-wrap gap-2 ${embedded ? "mt-4 pt-2 border-top" : "mt-4"}`}
      >
        {onCancel ? (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="food-promo-cta food-promo-cta--modal"
          disabled={busy}
        >
          {uploading ? "Uploading…" : saving ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );

  if (embedded) {
    return formInner;
  }

  return <div className="card border-0 shadow-sm p-4">{formInner}</div>;
}
