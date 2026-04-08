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
    const list = Array.isArray(payload) ? payload : [payload];
    setSaving(true);
    try {
      for (const p of list) {
        await createBanner(p);
      }
      success(
        list.length > 1
          ? `${list.length} banners created`
          : "Banner created",
      );
      router.push("/dashboard/banners");
    } catch (e) {
      error(e?.message || "Could not create banner(s)");
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
          Upload one or more images from your device. Pick the flow; sort order
          sets the first slide, then increases by 1 for each extra image.
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
