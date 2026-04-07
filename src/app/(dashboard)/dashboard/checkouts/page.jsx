"use client";

import React, { useCallback, useEffect, useState } from "react";
import "@/app/components/Loading.css";
import { useToast } from "@/hooks/useToast";
import { getPayments } from "@/services/paymentsService";

const PAGE_SIZE = 50;

function formatCell(v) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}

function formatWhen(v) {
  if (!v) return "—";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return formatCell(v);
  return d.toLocaleString();
}

export default function CheckoutsPage() {
  const { error } = useToast();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loadHint, setLoadHint] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadHint(null);
    try {
      const data = await getPayments(PAGE_SIZE, offset);
      setRows(Array.isArray(data?.rows) ? data.rows : []);
      setTotal(typeof data?.total === "number" ? data.total : 0);
    } catch (e) {
      const msg = e?.message || "Failed to load payments";
      error(msg);
      setRows([]);
      setTotal(0);
      if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
        setLoadHint(
          "Payments API not found (404). Deploy the backend with GET /api/v1/payments or set NEXT_PUBLIC_API_BASE_URL.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [error, offset]);

  useEffect(() => {
    load();
  }, [load]);

  const columns = [
    { key: "id", label: "ID" },
    { key: "paymentId", label: "Legacy payment ID" },
    { key: "userId", label: "User ID" },
    {
      key: "user",
      label: "User",
      render: (r) =>
        r.user
          ? `${r.user.name ?? ""} (${r.user.email ?? ""})`.trim() || "—"
          : "—",
    },
    { key: "payableType", label: "Type" },
    { key: "payableId", label: "Payable ID" },
    { key: "amount", label: "Amount" },
    { key: "currency", label: "Currency" },
    { key: "status", label: "Status" },
    { key: "paymentStatus", label: "Legacy status" },
    { key: "direction", label: "Direction" },
    { key: "paymentProvider", label: "Provider" },
    { key: "providerPaymentId", label: "Provider ref" },
    { key: "isCashPayment", label: "Cash?" },
    { key: "cashCollectedByVendor", label: "Cash collected" },
    { key: "vendorOwesPlatformCommission", label: "Vendor owes comm." },
    { key: "vendorId", label: "Vendor ID" },
    { key: "platformCommissionAmount", label: "Platform fee" },
    { key: "vendorAmount", label: "Vendor amt" },
    { key: "createdAt", label: "Created", render: (r) => formatWhen(r.createdAt) },
    { key: "updatedAt", label: "Updated", render: (r) => formatWhen(r.updatedAt) },
  ];

  const canPrev = offset > 0;
  const canNext = offset + rows.length < total;

  return (
    <section className="main-content-area">
      <div className="mb-4">
        <h1 className="dashboard-hd mb-2">Checkouts (Payments)</h1>
        <p className="text-muted mb-0" style={{ maxWidth: "42rem" }}>
          Data from the unified <code>Payments</code> table (hotel, food, rides,
          wallet, payouts). Newest first.
        </p>
      </div>

      {loadHint ? (
        <div className="alert alert-warning mb-4" role="alert">
          {loadHint}
        </div>
      ) : null}

      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 mb-3">
          <h2 className="dashboard-hd-mini mb-0" style={{ fontSize: "1.25rem" }}>
            All payment rows
          </h2>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small">
              {total} total · showing {rows.length ? offset + 1 : 0}–
              {offset + rows.length}
            </span>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              disabled={loading || !canPrev}
              onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              disabled={loading || !canNext}
              onClick={() => setOffset((o) => o + PAGE_SIZE)}
            >
              Next
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-5 text-center text-muted">Loading…</div>
        ) : rows.length === 0 ? (
          <p className="text-muted mb-0">No payment rows found.</p>
        ) : (
          <div className="table-responsive" style={{ maxHeight: "70vh" }}>
            <table className="table table-sm align-middle mb-0">
              <thead className="sticky-top bg-white">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="small text-nowrap">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {columns.map((c) => (
                      <td key={c.key} className="small">
                        {c.render
                          ? c.render(row)
                          : formatCell(row[c.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
