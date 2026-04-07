"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { createFoodPromo } from "@/services/discountService";
import { FoodPromoForm } from "../components/FoodPromoForm";

export default function NewFoodPromoPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      await createFoodPromo(payload);
      success("Promo created");
      router.push("/dashboard/food-promos");
    } catch (e) {
      error(e?.message || "Could not create promo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="main-content-area">
      <div className="mb-4">
        <Link
          href="/dashboard/food-promos"
          className="text-decoration-none small text-muted d-inline-flex align-items-center gap-1 mb-3"
        >
          ← Back to promo codes
        </Link>
        <h1 className="dashboard-hd mb-2">Add new promo</h1>
        <p className="text-muted mb-0" style={{ maxWidth: "42rem" }}>
          Codes are stored in lowercase. Percentage applies to cart subtotal;
          fixed is a flat discount.
        </p>
      </div>

      <FoodPromoForm
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/food-promos")}
        saving={saving}
        submitLabel="Create promo"
      />
    </section>
  );
}
