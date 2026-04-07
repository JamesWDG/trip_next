"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "@/app/components/Loading.css";
import { useToast } from "@/hooks/useToast";
import {
  deleteFoodPromo,
  getFoodPromos,
  updateFoodPromo,
} from "@/services/discountService";
import { FoodPromoForm } from "./components/FoodPromoForm";

function formatExpiry(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

const FOOD_PROMO_SKELETON_ROWS = 8;

function FoodPromosTableSkeleton() {
  return (
    <div className="table-responsive">
      <table className="table table-sm align-middle mb-0 food-promo-table-skeleton">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Value</th>
            <th>Used</th>
            <th>Expires</th>
            <th>Active</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: FOOD_PROMO_SKELETON_ROWS }, (_, i) => (
            <tr key={i}>
              <td>
                <div
                  className="skeleton"
                  style={{ height: 14, width: `${68 + (i % 4) * 6}%` }}
                />
              </td>
              <td>
                <div className="skeleton" style={{ height: 14, width: "52%" }} />
              </td>
              <td>
                <div className="skeleton" style={{ height: 14, width: 40 }} />
              </td>
              <td>
                <div className="skeleton" style={{ height: 14, width: 56 }} />
              </td>
              <td>
                <div
                  className="skeleton"
                  style={{ height: 14, width: `${62 + (i % 3) * 8}%` }}
                />
              </td>
              <td>
                <div className="skeleton" style={{ height: 14, width: 28 }} />
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

export default function FoodPromosPage() {
  const { success, error } = useToast();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadHint, setLoadHint] = useState(null);

  const [editingRow, setEditingRow] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterActive, setFilterActive] = useState("all");
  const [filterExpiry, setFilterExpiry] = useState("all");
  const [filterUsage, setFilterUsage] = useState("all");
  const [sortBy, setSortBy] = useState("created_desc");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadHint(null);
    try {
      const rows = await getFoodPromos();
      setList(Array.isArray(rows) ? rows : []);
    } catch (e) {
      const msg = e?.message || "Failed to load promos";
      error(msg);
      setList([]);
      if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
        setLoadHint(
          "The promo API is not available on this server yet (404). Deploy the backend with the /discount/food-promos routes, or point NEXT_PUBLIC_API_BASE_URL to an environment where it is deployed.",
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

  const promoModalOpen = editingRow !== null;

  useEffect(() => {
    if (!promoModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [promoModalOpen]);

  useEffect(() => {
    if (!promoModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [promoModalOpen, closeModal]);

  const startEdit = (row) => {
    setEditingRow(row);
  };

  const handleSubmitEdit = async (payload) => {
    if (!editingRow) return;
    setSaving(true);
    try {
      await updateFoodPromo(editingRow.id, payload);
      success("Promo updated");
      closeModal();
      await load();
    } catch (e) {
      error(e?.message || "Could not update promo");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (row) => {
    const ok = window.confirm(
      `Deactivate promo "${row.code}"? It will stop working for new checkouts.`,
    );
    if (!ok) return;
    setSaving(true);
    try {
      await deleteFoodPromo(row.id);
      success("Promo deactivated");
      if (editingRow?.id === row.id) closeModal();
      await load();
    } catch (e) {
      error(e?.message || "Could not deactivate promo");
    } finally {
      setSaving(false);
    }
  };

  const filteredRows = useMemo(() => {
    let rows = [...list];
    const q = search.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(q)) ||
          (r.code && r.code.toLowerCase().includes(q)),
      );
    }
    if (filterType !== "all") {
      rows = rows.filter((r) => r.type === filterType);
    }
    if (filterActive !== "all") {
      const want = filterActive === "active";
      rows = rows.filter((r) => !!r.isActive === want);
    }
    if (filterExpiry !== "all") {
      const now = Date.now();
      rows = rows.filter((r) => {
        if (!r.expiresAt) return filterExpiry === "valid";
        const t = new Date(r.expiresAt).getTime();
        if (Number.isNaN(t)) return filterExpiry === "valid";
        const expired = t < now;
        return filterExpiry === "expired" ? expired : !expired;
      });
    }
    if (filterUsage !== "all") {
      rows = rows.filter((r) => {
        const limit = r.usageLimit;
        const used = r.usageCount ?? 0;
        const exhausted = limit != null && used >= limit;
        const remaining = limit == null || used < limit;
        if (filterUsage === "remaining") return remaining;
        if (filterUsage === "exhausted") return exhausted;
        return true;
      });
    }

    const cmp = (a, b, key, dir = 1) => {
      const va = a[key];
      const vb = b[key];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return (va - vb) * dir;
      }
      return (
        String(va).localeCompare(String(vb), undefined, {
          sensitivity: "base",
        }) * dir
      );
    };

    rows.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return cmp(a, b, "name");
        case "code_asc":
          return cmp(a, b, "code");
        case "usage_desc": {
          const ua = Number(a.usageCount) || 0;
          const ub = Number(b.usageCount) || 0;
          return ub - ua;
        }
        case "created_desc":
        default: {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return (Number.isNaN(tb) ? 0 : tb) - (Number.isNaN(ta) ? 0 : ta);
        }
      }
    });

    return rows;
  }, [
    list,
    search,
    filterType,
    filterActive,
    filterExpiry,
    filterUsage,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearch("");
    setFilterType("all");
    setFilterActive("all");
    setFilterExpiry("all");
    setFilterUsage("all");
    setSortBy("created_desc");
  };

  const hasActiveFilters =
    search.trim() ||
    filterType !== "all" ||
    filterActive !== "all" ||
    filterExpiry !== "all" ||
    filterUsage !== "all" ||
    sortBy !== "created_desc";

  return (
    <section className="main-content-area">
      <div className="d-flex flex-wrap align-items-start justify-content-between gap-4 mb-4">
        <div className="flex-grow-1" style={{ minWidth: "min(100%, 280px)" }}>
          <h1 className="dashboard-hd mb-2">Food delivery — promo codes</h1>
          <p className="text-muted mb-0" style={{ maxWidth: "42rem" }}>
            Create and manage codes for the customer app checkout. Percentage
            applies to cart subtotal; fixed is a flat discount. Codes are stored
            in lowercase. Deleting a promo deactivates it (soft delete).
          </p>
        </div>
        <Link
          href="/dashboard/food-promos/new"
          className="food-promo-cta flex-shrink-0 d-inline-flex align-items-center justify-content-center text-decoration-none"
        >
          + Add new promo
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
                placeholder="Name or code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Type</label>
              <select
                className="form-select form-select-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All types</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Status</label>
              <select
                className="form-select form-select-sm"
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Expiry</label>
              <select
                className="form-select form-select-sm"
                value={filterExpiry}
                onChange={(e) => setFilterExpiry(e.target.value)}
              >
                <option value="all">All</option>
                <option value="valid">Not expired</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="col-6 col-md-4 col-lg-2">
              <label className="form-label small text-muted mb-1">Usage</label>
              <select
                className="form-select form-select-sm"
                value={filterUsage}
                onChange={(e) => setFilterUsage(e.target.value)}
              >
                <option value="all">All</option>
                <option value="remaining">Has uses left</option>
                <option value="exhausted">Limit reached</option>
              </select>
            </div>
            <div className="col-md-4 col-lg-1">
              <label className="form-label small text-muted mb-1">Sort</label>
              <select
                className="form-select form-select-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="created_desc">Newest</option>
                <option value="name_asc">Name A–Z</option>
                <option value="code_asc">Code A–Z</option>
                <option value="usage_desc">Most used</option>
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
              {list.length} promo{list.length === 1 ? "" : "s"} total
            </p>
          )}
        </div>
      ) : null}

      <div className="card border-0 shadow-sm p-4">
        <h3
          className="dashboard-hd-mini mb-3"
          style={{ fontSize: "1.35rem", marginBottom: "1rem" }}
        >
          Existing promos
        </h3>
        {loading ? (
          <FoodPromosTableSkeleton />
        ) : filteredRows.length === 0 ? (
          <div className="text-center py-5 px-2">
            <p className="text-muted mb-0">
              {list.length === 0
                ? "No promos yet. Use “Add new promo” at the top to create one."
                : "No promos match the current filters."}
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
            <table className="table table-sm align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Value</th>
                  <th>Used</th>
                  <th>Expires</th>
                  <th>Active</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>
                      <code>{row.code}</code>
                    </td>
                    <td>
                      {row.type === "percentage"
                        ? `${row.discount}%`
                        : row.discount}
                    </td>
                    <td>
                      {row.usageCount ?? 0}
                      {row.usageLimit != null ? ` / ${row.usageLimit}` : ""}
                    </td>
                    <td className="small text-muted">
                      {formatExpiry(row.expiresAt)}
                    </td>
                    <td>{row.isActive ? "Yes" : "No"}</td>
                    <td className="text-end text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => startEdit(row)}
                        disabled={saving}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(row)}
                        disabled={saving || !row.isActive}
                        title={
                          !row.isActive
                            ? "Already inactive"
                            : "Deactivate promo"
                        }
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

      {promoModalOpen ? (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="food-promo-modal-title"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title h5 mb-0" id="food-promo-modal-title">
                  Edit promo
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body pt-0">
                <FoodPromoForm
                  key={editingRow.id}
                  initialData={editingRow}
                  onSubmit={handleSubmitEdit}
                  onCancel={closeModal}
                  saving={saving}
                  submitLabel="Update promo"
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
