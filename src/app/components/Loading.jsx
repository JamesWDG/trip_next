"use client";

import React from "react";
import "./Loading.css";

export default function Loading({ 
  loading = true, 
  children, 
  size = "medium",
  text = "Loading..."
}) {
  if (!loading) {
    return children || null;
  }

  return (
    <div className={`loading-container loading-${size}`}>
      <div className="loading-spinner-wrapper">
        <div className="loading-spinner">
          <div className="spinner-inner"></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    </div>
  );
}

/**
 * Full page loader overlay - blocks interaction while loading
 */
export function PageLoader({ loading, text = "Loading..." }) {
  if (!loading) return null;

  return (
    <div className="page-loader-overlay">
      <div className="page-loader-content">
        <div className="page-loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="page-loader-text">{text}</p>
      </div>
    </div>
  );
}

/**
 * Inline loader for buttons or small spaces
 */
export function InlineLoader({ size = "small" }) {
  return (
    <span className={`inline-loader inline-loader-${size}`}>
      <span className="inline-spinner"></span>
    </span>
  );
}
