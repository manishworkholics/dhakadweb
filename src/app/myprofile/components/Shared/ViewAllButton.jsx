// myprofile/components/Shared/ViewAllButton.jsx
"use client";

import Link from "next/link";
import React from "react";

export default function ViewAllButton({ label = "View All", href = "#", onClick }) {
  return (
    <Link href={href} onClick={onClick} className="view-all-button text-decoration-none">
      {label}
    </Link>
  );
}
