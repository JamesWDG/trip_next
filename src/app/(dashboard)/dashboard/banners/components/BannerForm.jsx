"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";

const FLOWS = [
  { value: "food", label: "Food delivery" },
  { value: "ride", label: "Ride / cab" },
  { value: "hotel", label: "Hotels / stay" },
];

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

export function buildBannerPayload(values) {
  const sort =
    values.sortOrder === "" || values.sortOrder == null
      ? 0
      : Number(values.sortOrder);
  return {
    flow: values.flow,
    imageUrl: values.imageUrl.trim(),
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
 * @param {(payload: object) => Promise<void>} props.onSubmit
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

  useEffect(() => {
    setValues(fromRow(initialData));
  }, [initialData]);

  const set = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.imageUrl.trim()) {
      error("Image URL is required");
      return;
    }
    await onSubmit(buildBannerPayload(values));
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
            Lower numbers show first within the same flow.
          </span>
        </div>
        <div className="col-12">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            value={values.imageUrl}
            onChange={set("imageUrl")}
            placeholder="https://…"
            autoFocus={!initialData}
          />
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
            disabled={saving}
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          className="food-promo-cta food-promo-cta--modal"
          disabled={saving}
        >
          {saving ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );

  if (embedded) {
    return formInner;
  }

  return <div className="card border-0 shadow-sm p-4">{formInner}</div>;
}
