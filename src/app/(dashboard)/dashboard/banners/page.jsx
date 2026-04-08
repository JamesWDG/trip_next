"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "@/app/components/Loading.css";
import { useToast } from "@/hooks/useToast";
import {
  deleteBanner,
  getBannersAdmin,
  updateBanner,
} from "@/services/bannerService";
import { BannerForm } from "./components/BannerForm";

const FLOW_LABEL = {
  food: "Food",
  ride: "Ride",
  hotel: "Hotel",
};

function flowLabel(flow) {
  return FLOW_LABEL[flow] ?? flow ?? "—";
}

const SKELETON_ROWS = 6;

function BannersTableSkeleton() {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm align-middle mb-0 food-promo-list-table food-promo-table-skeleton">
        <thead className="table-light">
          <tr>
            <th className="small text-nowrap">Preview</th>
            <th className="small text-nowrap">Flow</th>
            <th className="small">Title</th>
            <th className="small text-nowrap">Sort</th>
            <th className="small text-center text-nowrap food-promo-active-col">
              Active
            </th>
            <th className="small text-end text-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <tr key={i}>
              <td>
                <div
                  className="skeleton rounded"
                  style={{ width: 72, height: 40 }}
                />
              </td>
              <td className="small">
                <div className="skeleton" style={{ height: 14, width: 48 }} />
              </td>
              <td className="small">
                <div
                  className="skeleton"
                  style={{ height: 14, width: `${60 + (i % 3) * 10}%` }}
                />
              </td>
              <td className="small">
                <div className="skeleton" style={{ height: 14, width: 32 }} />
              </td>
              <td className="text-center food-promo-active-col">
                <div
                  className="skeleton mx-auto"
                  style={{ height: 22, width: 44, borderRadius: 999 }}
                />
              </td>
              <td className="text-end">
                <div
                  className="skeleton ms-auto"
                  style={{ height: 28, width: 96, borderRadius: 6 }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BannerThumb({ src, alt }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) {
    return (
      <div
        className="bg-light border rounded d-flex align-items-center justify-content-center text-muted small"
        style={{ width: 72, height: 40, fontSize: 10 }}
      >
        No img
      </div>
    );
  }
  return (
    <div
      className="rounded overflow-hidden border bg-light"
      style={{ width: 72, height: 40 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt || ""}
        className="w-100 h-100 object-fit-cover d-block"
        style={{ objectFit: "cover" }}
        onError={() => setBroken(true)}
      />
    </div>
  );
}

export default function BannersPage() {
  const { success, error } = useToast();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [loadHint, setLoadHint] = useState(null);

  const [editingRow, setEditingRow] = useState(null);
  const [search, setSearch] = useState("");
  const [filterFlow, setFilterFlow] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadHint(null);
    try {
      const rows = await getBannersAdmin();
      setList(Array.isArray(rows) ? rows : []);
    } catch (e) {
      const msg = e?.message || "Failed to load banners";
      error(msg);
      setList([]);
      if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
        setLoadHint(
          "Banner API not found (404). Deploy the backend with content admin routes, or set NEXT_PUBLIC_API_BASE_URL to an environment where /api/v1/content/admin/banners is available.",
        );
      } else if (msg.toLowerCase().includes("forbidden") || msg.includes("403")) {
        setLoadHint(
          "Only admin accounts can manage banners. Sign in with an admin user.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    load();
  }, [load]);

  const closeModal = useCallback(() => {
    setEditingRow(null);
  }, []);

  const modalOpen = editingRow !== null;

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  const handleSubmitEdit = async (payload) => {
    if (!editingRow) return;
    setSaving(true);
    try {
      await updateBanner(editingRow.id, payload);
      success("Banner updated");
      closeModal();
      await load();
    } catch (e) {
      error(e?.message || "Could not update banner");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    const ok = window.confirm(
      `Delete this banner${row.title ? ` (“${row.title}”)` : ""}? This cannot be undone.`,
    );
    if (!ok) return;
    setSaving(true);
    try {
      await deleteBanner(row.id);
      success("Banner deleted");
      if (editingRow?.id === row.id) closeModal();
      await load();
    } catch (e) {
      error(e?.message || "Could not delete banner");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (row, nextActive) => {
    setTogglingId(row.id);
    try {
      await updateBanner(row.id, { isActive: nextActive });
      success(nextActive ? "Banner activated" : "Banner deactivated");
      await load();
    } catch (e) {
      error(e?.message || "Could not update banner status");
    } finally {
      setTogglingId(null);
    }
  };

  const filteredRows = useMemo(() => {
    let rows = [...list];
    if (filterFlow !== "all") {
      rows = rows.filter((r) => r.flow === filterFlow);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) => {
        const t = (r.title || "").toLowerCase();
        const s = (r.subtitle || "").toLowerCase();
        const u = (r.imageUrl || "").toLowerCase();
        return t.includes(q) || s.includes(q) || u.includes(q);
      });
    }
    rows.sort((a, b) => {
      const fa = String(a.flow || "");
      const fb = String(b.flow || "");
      if (fa !== fb) return fa.localeCompare(fb);
      const sa = Number(a.sortOrder) || 0;
      const sb = Number(b.sortOrder) || 0;
      if (sa !== sb) return sa - sb;
      return (Number(b.id) || 0) - (Number(a.id) || 0);
    });
    return rows;
  }, [list, search, filterFlow]);

  const clearFilters = () => {
    setSearch("");
    setFilterFlow("all");
  };

  const hasActiveFilters = search.trim() || filterFlow !== "all";

  return (
    <section className="main-content-area">
      <div className="d-flex flex-wrap align-items-start justify-content-between gap-4 mb-4">
        <div className="flex-grow-1" style={{ minWidth: "min(100%, 280px)" }}>
          <h1 className="dashboard-hd mb-2">Banners</h1>
          <p className="text-muted mb-0" style={{ maxWidth: "42rem" }}>
            Home carousel images for each app flow (food, ride, hotels). Choose
            the flow when creating a banner; inactive banners stay hidden in the
            app.
          </p>
        </div>
        <Link
          href="/dashboard/banners/new"
          className="food-promo-cta flex-shrink-0 d-inline-flex align-items-center justify-content-center text-decoration-none"
        >
          + Add banner
        </Link>
      </div>

      {loadHint ? (
        <div className="alert alert-warning mb-4" role="alert">
          {loadHint}
        </div>
      ) : null}

      {list.length > 0 ? (
        <div className="card border-0 shadow-sm p-4 mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4 col-lg-3">
              <label className="form-label small text-muted mb-1">Search</label>
              <input
                className="form-control form-control-sm"
                placeholder="Title, subtitle, or image URL"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Flow</label>
              <select
                className="form-select form-select-sm"
                value={filterFlow}
                onChange={(e) => setFilterFlow(e.target.value)}
              >
                <option value="all">All flows</option>
                <option value="food">Food</option>
                <option value="ride">Ride</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>
          </div>
          {hasActiveFilters ? (
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-link btn-sm p-0"
                onClick={clearFilters}
              >
                Clear filters
              </button>
              <span className="text-muted small ms-2">
                Showing {filteredRows.length} of {list.length}
              </span>
            </div>
          ) : (
            <p className="text-muted small mb-0 mt-2">
              {list.length} banner{list.length === 1 ? "" : "s"} total
            </p>
          )}
        </div>
      ) : null}

      <div className="card border-0 shadow-sm p-4">
        <h3
          className="dashboard-hd-mini mb-3"
          style={{ fontSize: "1.35rem", marginBottom: "1rem" }}
        >
          All banners
        </h3>
        {loading ? (
          <BannersTableSkeleton />
        ) : filteredRows.length === 0 ? (
          <div className="text-center py-5 px-2">
            <p className="text-muted mb-0">
              {list.length === 0
                ? "No banners yet. Use “Add banner” to create one."
                : "No banners match the current filters."}
            </p>
            {list.length > 0 && filteredRows.length === 0 ? (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mt-3"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-sm align-middle mb-0 food-promo-list-table">
              <thead className="table-light">
                <tr>
                  <th className="small text-nowrap">Preview</th>
                  <th className="small text-nowrap">Flow</th>
                  <th className="small">Title</th>
                  <th className="small text-nowrap">Sort</th>
                  <th className="small text-center text-nowrap food-promo-active-col">
                    Active
                  </th>
                  <th className="small text-end text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td className="align-middle">
                      <BannerThumb
                        src={row.imageUrl}
                        alt={row.title || "Banner"}
                      />
                    </td>
                    <td className="small text-nowrap">
                      {flowLabel(row.flow)}
                    </td>
                    <td className="small">
                      <div className="fw-medium">{row.title || "—"}</div>
                      {row.subtitle ? (
                        <div className="text-muted small text-truncate" style={{ maxWidth: 280 }}>
                          {row.subtitle}
                        </div>
                      ) : null}
                    </td>
                    <td className="small">{row.sortOrder ?? 0}</td>
                    <td className="text-center align-middle food-promo-active-cell food-promo-active-col">
                      <div className="form-check form-switch food-promo-active-switch d-inline-block mb-0">
                        <input
                          id={`banner-active-${row.id}`}
                          type="checkbox"
                          role="switch"
                          className="form-check-input"
                          checked={!!row.isActive}
                          disabled={saving || togglingId === row.id}
                          onChange={(e) =>
                            handleToggleActive(row, e.target.checked)
                          }
                          title={
                            row.isActive
                              ? "Switch off to hide in app"
                              : "Switch on to show in app"
                          }
                          aria-label={
                            row.isActive
                              ? "Active: on. Click to deactivate"
                              : "Active: off. Click to activate"
                          }
                        />
                      </div>
                    </td>
                    <td className="text-end text-nowrap small">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => setEditingRow(row)}
                        disabled={saving}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(row)}
                        disabled={saving}
                        title="Delete banner"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen ? (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="banner-modal-title"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title h5 mb-0" id="banner-modal-title">
                  Edit banner
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body pt-0">
                <BannerForm
                  key={editingRow.id}
                  initialData={editingRow}
                  onSubmit={handleSubmitEdit}
                  onCancel={closeModal}
                  saving={saving}
                  submitLabel="Update banner"
                  embedded
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
