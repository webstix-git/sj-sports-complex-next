"use client";

import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { applyHover, clearHover } from "@/components/siteHover";

type SiteChromeProps = {
  home?: boolean;
  children: ReactNode;
};

export default function SiteChrome({ home = false, children }: SiteChromeProps) {
  return (
    <div
      onMouseOver={applyHover}
      onMouseOut={clearHover}
      style={{ minHeight: "100vh", overflowX: "hidden", display: "flex", flexDirection: "column" }}
    >
      <SiteHeader home={home} />
      <div style={{ flex: 1 }}>{children}</div>
      <SiteFooter home={home} />
    </div>
  );
}
