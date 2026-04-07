"use client";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";

export function toDatetimeLocalValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function emptyState() {
  return {
    name: "",
    code: "",
    discount: "",
    discountType: "percentage",
    minOrderAmount: "",
    maxDiscountAmount: "",
    usageLimit: "",
    expiresAtLocal: "",
    isActive: true,
  };
}

function fromRow(row) {
  if (!row) return emptyState();
  return {
    name: row.name ?? "",
    code: row.code ?? "",
    discount: String(row.discount ?? ""),
    discountType: row.type === "fixed" ? "fixed" : "percentage",
    minOrderAmount:
      row.minOrderAmount != null ? String(row.minOrderAmount) : "",
    maxDiscountAmount:
      row.maxDiscountAmount != null ? String(row.maxDiscountAmount) : "",
    usageLimit: row.usageLimit != null ? String(row.usageLimit) : "",
    expiresAtLocal: toDatetimeLocalValue(row.expiresAt),
    isActive: !!row.isActive,
  };
}

export function buildPromoPayload(values) {
  let expiresIso = null;
  if (values.expiresAtLocal?.trim()) {
    const d = new Date(values.expiresAtLocal);
    expiresIso = Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  return {
    name: values.name.trim(),
    code: values.code.trim(),
    discount: Number(values.discount),
    discountType: values.discountType,
    minOrderAmount:
      values.minOrderAmount === "" ? null : Number(values.minOrderAmount),
    maxDiscountAmount:
      values.maxDiscountAmount === "" ? null : Number(values.maxDiscountAmount),
    usageLimit: values.usageLimit === "" ? null : Number(values.usageLimit),
    expiresAt: expiresIso,
    isActive: values.isActive,
  };
}

/**
 * @param {object} props
 * @param {object | null} [props.initialData] — Existing promo row for edit; omit/null for create
 * @param {(payload: object) => Promise<void>} props.onSubmit
 * @param {() => void} [props.onCancel]
 * @param {boolean} props.saving
 * @param {string} props.submitLabel
 * @param {boolean} [props.embedded] — if true, no card wrapper (for modal body)
 */
export function FoodPromoForm({
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
    if (!values.name.trim() || !values.code.trim() || values.discount === "") {
      error("Name, code, and discount are required");
      return;
    }
    await onSubmit(buildPromoPayload(values));
  };

  const formInner = (
    <form className="food-promo-form" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={values.name}
            onChange={set("name")}
            placeholder="Summer sale"
            autoFocus={!initialData}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Code</label>
          <input
            className="form-control"
            value={values.code}
            onChange={set("code")}
            placeholder="EAT20"
            autoCapitalize="characters"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={values.discountType}
            onChange={set("discountType")}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed amount</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">
            {values.discountType === "percentage"
              ? "Percent off"
              : "Amount off"}
          </label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            min="0"
            value={values.discount}
            onChange={set("discount")}
            placeholder={
              values.discountType === "percentage" ? "15" : "500"
            }
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Min order (optional)</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            min="0"
            value={values.minOrderAmount}
            onChange={set("minOrderAmount")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Max discount cap for % (optional)</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            min="0"
            value={values.maxDiscountAmount}
            onChange={set("maxDiscountAmount")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Usage limit (optional)</label>
          <input
            className="form-control"
            type="number"
            min="1"
            value={values.usageLimit}
            onChange={set("usageLimit")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Expires (optional)</label>
          <input
            className="form-control"
            type="datetime-local"
            value={values.expiresAtLocal}
            onChange={set("expiresAtLocal")}
          />
        </div>
        <div className="col-12">
          <div className="food-promo-form-check form-check">
            <input
              id="promo-active-field"
              className="form-check-input"
              type="checkbox"
              checked={values.isActive}
              onChange={set("isActive")}
            />
            <label className="form-check-label" htmlFor="promo-active-field">
              Active (customers can use this code when valid)
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

  return (
    <div className="card border-0 shadow-sm p-4">{formInner}</div>
  );
}
