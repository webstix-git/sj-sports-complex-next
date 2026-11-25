"use client";

type SiteFooterProps = {
  home?: boolean;
};

const explore = [
  { href: "about", label: "Mission" },
  { href: "programs", label: "Sports" },
  { href: "miracle", label: "Miracle Field" },
  { href: "park", label: "The Park" },
  { href: "gallery", label: "Gallery" },
  { href: "location", label: "Location" },
  { href: "contact", label: "Contact" },
] as const;

const mailMapsUrl = "https://maps.app.goo.gl/r6NhCR8BDQaojjdL6";

export default function SiteFooter({ home = false }: SiteFooterProps) {
  const link = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <footer
      className="sj-fixed-bg"
      style={{
        position: "relative",
        color: "#E4E9F2",
        fontSize: "14px",
        overflow: "hidden",
        backgroundColor: "#1F5A22",
        backgroundImage: "url(/images/img-footer-grass.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(6,22,10,.86) 0%,rgba(6,22,10,.8) 45%,rgba(6,22,10,.92) 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      <div style={{ position: "relative", height: "6px", background: "#fff", opacity: 0.9 }} />

      <div
        className="sj-section-pad"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "72px 28px 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <a
            href={home ? "#top" : "/"}
            aria-label="St. Joseph Youth Sports Foundation home"
            style={{ display: "inline-block", width: "fit-content" }}
          >
            <img
              src="/images/logo.png"
              alt="St. Joseph Youth Sports Foundation logo"
              style={{
                width: "150px",
                maxWidth: "100%",
                height: "auto",
                display: "block",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,.4))",
              }}
            />
          </a>
          <span
            style={{
              color: "#fff",
              fontWeight: 900,
              fontStyle: "italic",
              textTransform: "uppercase",
              fontSize: "18px",
            }}
          >
            Build. Play. Belong.
          </span>
          <span style={{ lineHeight: 1.6, maxWidth: "300px", color: "#E4E9F2" }}>
            A parent-led 501(c)(3) nonprofit giving St. Joseph kids of every ability a place to
            practice, compete and grow.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              color: "#E7BA22",
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Explore
          </span>
          {explore.map((item) => (
            <a
              key={item.href}
              href={link(item.href)}
              style={{ color: "#fff", fontWeight: 600 }}
              data-hover='{"color": "#E7BA22"}'
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              color: "#E7BA22",
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Contact
          </span>
          <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ flexShrink: 0, marginTop: "2px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7BA22"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <a
              href={mailMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open mailing address in Google Maps"
              style={{
                lineHeight: 1.5,
                color: "#fff",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
              data-hover='{"color": "#E7BA22"}'
            >
              1816 Nash Dr.
              <br />
              St. Joseph, MI 49085
            </a>
          </span>
          <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ flexShrink: 0, marginTop: "2px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7BA22"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
              </svg>
            </span>
            <a
              href="tel:2694146048"
              style={{ color: "#fff", fontWeight: 600 }}
              data-hover='{"color": "#E7BA22"}'
            >
              269-414-6048
            </a>
          </span>
          <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ flexShrink: 0, marginTop: "2px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7BA22"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
            </span>
            <a
              href="mailto:sjyouthsports@gmail.com"
              style={{ color: "#fff", fontWeight: 600, wordBreak: "break-word" }}
              data-hover='{"color": "#E7BA22"}'
            >
              sjyouthsports@gmail.com
            </a>
          </span>
          <span style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <span style={{ flexShrink: 0, marginTop: "2px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7BA22"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <span style={{ lineHeight: 1.5, color: "#E4E9F2" }}>Mon–Fri, 9 AM – 5 PM</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{
              color: "#E7BA22",
              fontWeight: 900,
              fontSize: "12px",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Follow
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a
              href="https://www.facebook.com/SJYouthSports/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#E7BA22",
                color: "#00214D",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-hover='{"background": "#fff", "color": "#00214D"}'
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 13.5h2.5l1-4H14v-2.3c0-1.1.3-1.9 2-1.9h1.7V1.5C17.1 1.4 15.8 1 14.3 1 11.1 1 9 3 9 6.4V9.5H6.5v4H9V23h5v-9.5z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/sjyouthsports/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#E7BA22",
                color: "#00214D",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-hover='{"background": "#fff", "color": "#00214D"}'
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        className="sj-section-pad"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "22px 28px",
          borderTop: "1px solid rgba(255,255,255,.14)",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          alignItems: "center",
          color: "#E4E9F2",
        }}
      >
        <span>© 2026 St. Joseph Youth Sports Foundation</span>
        <span style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px" }}>
          <a
            href="/privacy-policy"
            style={{ color: "#fff", fontWeight: 600 }}
            data-hover='{"color": "#E7BA22"}'
          >
            Privacy Policy
          </a>
          <a
            href="/ai-policy"
            style={{ color: "#fff", fontWeight: 600 }}
            data-hover='{"color": "#E7BA22"}'
          >
            AI Policy
          </a>
          <a
            href="/ai-readiness"
            style={{ color: "#fff", fontWeight: 600 }}
            data-hover='{"color": "#E7BA22"}'
          >
            AI Readiness Service Index
          </a>
        </span>
      </div>
    </footer>
  );
}
