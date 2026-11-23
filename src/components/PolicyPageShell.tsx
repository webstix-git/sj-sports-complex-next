import type { ReactNode } from "react";
import SiteChrome from "@/components/SiteChrome";

type PolicyPageShellProps = {
  title: string;
  eyebrow: string;
  updated: string;
  lead?: string;
  children: ReactNode;
};

export default function PolicyPageShell({
  title,
  eyebrow,
  updated,
  lead,
  children,
}: PolicyPageShellProps) {
  return (
    <SiteChrome>
      <div style={{ background: "#F3F1EA", color: "#1A1F21", paddingTop: "72px" }}>
        <div
          style={{
            background: "#00214D",
            color: "#fff",
            borderBottom: "4px solid #E7BA22",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "56px 28px 48px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 900,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#E7BA22",
              }}
            >
              {eyebrow}
            </div>
            <h1
              style={{
                fontWeight: 900,
                fontStyle: "italic",
                textTransform: "uppercase",
                fontSize: "clamp(32px,5vw,52px)",
                lineHeight: "calc(1em + 8px)",
                letterSpacing: "-.02em",
                margin: "12px 0 0",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {title}
            </h1>
            {lead ? (
              <p
                style={{
                  margin: "18px 0 0",
                  maxWidth: "72ch",
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,.88)",
                  textAlign: "left",
                }}
              >
                {lead}
              </p>
            ) : null}
            <p
              style={{
                margin: "16px 0 0",
                color: "rgba(255,255,255,.55)",
                fontSize: "14px",
                textAlign: "left",
              }}
            >
              Last updated: {updated}
            </p>
          </div>
        </div>

        <main
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "40px 28px 96px",
            textAlign: "left",
          }}
        >
          <div
            className="policy-content"
            style={{
              background: "transparent",
              padding: "clamp(28px,4vw,44px) 0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "16px",
              lineHeight: 1.7,
              textAlign: "left",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </SiteChrome>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        paddingTop: "28px",
        borderTop: "1px solid #E6E2D8",
      }}
    >
      <h2
        style={{
          margin: "0 0 16px",
          fontWeight: 900,
          fontStyle: "italic",
          textTransform: "uppercase",
          fontSize: "22px",
          color: "#00214D",
          letterSpacing: "-.01em",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{children}</div>
    </section>
  );
}

export function FactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="policy-fact-row"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px,220px) minmax(0,1fr)",
        gap: "8px 24px",
        padding: "14px 0",
        borderBottom: "1px solid #EFEBE3",
        alignItems: "start",
      }}
    >
      <dt
        style={{
          margin: 0,
          fontWeight: 800,
          color: "#00214D",
          fontSize: "14px",
          letterSpacing: ".02em",
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0, color: "#3A4554" }}>{children}</dd>
    </div>
  );
}

export function FactList({ children }: { children: ReactNode }) {
  return (
    <dl
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </dl>
  );
}
