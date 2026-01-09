// myprofile/components/Shared/ViewAllButton.jsx
"use client";

import Link from "next/link";
import React from "react";

export default function ViewAllButton({ label = "View All", href = "#", onClick }) {
  return (
    <Link href={href} onClick={onClick} className="short-btn text-decoration-none px-4 py-2 rounded-3">
      {label}
    </Link>
  );
}
