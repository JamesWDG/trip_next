"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { createBanner } from "@/services/bannerService";
import { BannerForm } from "../components/BannerForm";

export default function NewBannerPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      await createBanner(payload);
      success("Banner created");
      router.push("/dashboard/banners");
    } catch (e) {
      error(e?.message || "Could not create banner");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="main-content-area">
      <div className="mb-4">
        <Link
          href="/dashboard/banners"
          className="text-decoration-none small text-muted d-inline-flex align-items-center gap-1 mb-3"
        >
          ← Back to banners
        </Link>
        <h1 className="dashboard-hd mb-2">Add banner</h1>
        <p className="text-muted mb-0" style={{ maxWidth: "42rem" }}>
          Paste a public image URL. Pick which home flow it belongs to; ordering
          is controlled by sort order within that flow.
        </p>
      </div>

      <BannerForm
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/dashboard/banners")}
        saving={saving}
        submitLabel="Create banner"
      />
    </section>
  );
}
