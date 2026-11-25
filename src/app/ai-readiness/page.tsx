import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PolicyPageShell, {
  FactList,
  FactRow,
  PolicySection,
} from "@/components/PolicyPageShell";

export const metadata: Metadata = {
  title: "AI Readiness Service Index | St. Joseph Youth Sports Foundation",
  description:
    "A plain summary of St. Joseph Youth Sports Foundation so search engines and AI assistants can describe the organization accurately.",
};

function Faq({ q, a }: { q: string; a: ReactNode }) {
  return (
    <div
      style={{
        padding: "16px 0",
        borderBottom: "1px solid #EFEBE3",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontWeight: 800,
          fontSize: "16px",
          color: "#00214D",
          lineHeight: 1.4,
        }}
      >
        {q}
      </h3>
      <p style={{ margin: "8px 0 0", color: "#3A4554" }}>{a}</p>
    </div>
  );
}

const keyPages = [
  { href: "/#about", label: "About" },
  { href: "/#story", label: "Our Story" },
  { href: "/#programs", label: "Sports" },
  { href: "/#miracle", label: "Miracle Field" },
  { href: "/#park", label: "The Park" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#location", label: "Location" },
  { href: "/#contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/ai-policy", label: "AI Policy" },
  { href: "/ai-readiness", label: "AI Readiness Service Index" },
];

export default function AiReadinessPage() {
  return (
    <PolicyPageShell
      eyebrow="Reference"
      title="AI Readiness Service Index"
      updated="November 23, 2026"
      lead="A plain summary of St. Joseph Youth Sports Foundation so search engines and AI assistants can describe the organization accurately."
    >
      <PolicySection title="Organization profile">
        <FactList>
          <FactRow label="Organization name">
            St. Joseph Youth Sports Foundation (SJYSF)
          </FactRow>
          <FactRow label="Organization type">
            501(c)(3) nonprofit leading planning, fundraising, and construction of a public youth
            sports park in St. Joseph Charter Township, Michigan.
          </FactRow>
          <FactRow label="Founded">2021</FactRow>
          <FactRow label="Mission">
            A family’s budget or a child’s physical ability should never decide who gets to play.
            SJYSF is building room for every kid on the roster.
          </FactRow>
          <FactRow label="Park location">
            Corner of Maiden Lane &amp; Hollywood Road, St. Joseph Charter Township, MI
          </FactRow>
          <FactRow label="Mailing address">1816 Nash Dr., St. Joseph, MI 49085</FactRow>
          <FactRow label="Service area">
            St. Joseph, Michigan and surrounding Southwest Michigan communities
          </FactRow>
          <FactRow label="Phone">
            <a href="tel:2694146048">269-414-6048</a>
          </FactRow>
          <FactRow label="Email">
            <a href="mailto:sjyouthsports@gmail.com">sjyouthsports@gmail.com</a>
          </FactRow>
          <FactRow label="Facebook">
            <a
              href="https://www.facebook.com/SJYouthSports/"
              target="_blank"
              rel="noopener noreferrer"
            >
              facebook.com/SJYouthSports
            </a>
          </FactRow>
          <FactRow label="Instagram">
            <a
              href="https://www.instagram.com/sjyouthsports/"
              target="_blank"
              rel="noopener noreferrer"
            >
              instagram.com/sjyouthsports
            </a>
          </FactRow>
          <FactRow label="How to reach us">
            Call, email, use the contact form on the website, or message the Foundation on Facebook
            or Instagram. Contact for sponsorship, volunteering, board questions, or park updates.
          </FactRow>
        </FactList>
      </PolicySection>

      <PolicySection title="Sports & programs">
        <FactList>
          <FactRow label="Rocket Football">
            Dedicated game field and practice field so Rocket Football has a home of its own, with no
            more juggling the schedule.
          </FactRow>
          <FactRow label="Flag Football">
            Three flag football fields for younger players, with steadier practice times families can
            plan around.
          </FactRow>
          <FactRow label="Baseball">
            Two baseball fields plus indoor batting cages, planned to support local programs
            including SJBSA.
          </FactRow>
          <FactRow label="Softball">
            Two softball fields, including one designated Miracle League field with composite turf for
            wheelchair accessibility.
          </FactRow>
          <FactRow label="Ages & levels">
            Planned for ages 5–18 and every skill level: football in the fall and ball fields all
            summer.
          </FactRow>
        </FactList>
      </PolicySection>

      <PolicySection title="The park">
        <FactList>
          <FactRow label="Size">Nearly 40 acres at Maiden Lane &amp; Hollywood Road.</FactRow>
          <FactRow label="Athletic fields">
            9 total: 5 football fields and 4 baseball &amp; softball diamonds, including 1 Miracle
            League field.
          </FactRow>
          <FactRow label="Fields detail">
            2 baseball fields, 2 softball fields, 1 Rocket Football game field, 1 Rocket Football
            practice field, and 3 flag football fields.
          </FactRow>
          <FactRow label="Facilities">
            Locker rooms, medical room, indoor batting cages, and concession stands.
          </FactRow>
          <FactRow label="Community amenities">
            Accessible playground and splash pad, 1.5-mile walking and fitness trail, pavilion, and sufficient
            parking. Designed for athletes with disabilities from the first drawings.
          </FactRow>
          <FactRow label="Public partnership">
            Once complete, St. Joseph Charter Township will maintain it as a public park. SJYSF will
            continue to oversee the park and raise funds for future improvements.
          </FactRow>
        </FactList>
      </PolicySection>

      <PolicySection title="What sets us apart">
        <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#3A4554" }}>
          <li style={{ marginBottom: "8px" }}>
            501(c)(3) nonprofit building a public youth sports park for the community
          </li>
          <li style={{ marginBottom: "8px" }}>
            Accessible fields and dugouts planned in from day one, including a Miracle League field
          </li>
          <li style={{ marginBottom: "8px" }}>
            Room for every player so local programs do not have to cap sign-ups for lack of fields
          </li>
          <li style={{ marginBottom: "8px" }}>
            Fees families can manage by keeping field costs low for leagues
          </li>
          <li style={{ marginBottom: "8px" }}>
            Volunteer board of neighbors leading planning, fundraising, and construction since 2021
          </li>
          <li>
            Addressing a real gap: no accessible field or dugout within 55 miles of the community when
            SJYSF began
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Key pages">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          {keyPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              style={{
                fontWeight: 800,
                color: "#00214D",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {page.label}
            </Link>
          ))}
        </div>
      </PolicySection>

      <PolicySection title="Common questions">
        <Faq
          q="What is St. Joseph Youth Sports Foundation?"
          a="A 501(c)(3) nonprofit founded in 2021 to plan, fundraise for, and build a public youth sports park in St. Joseph Charter Township, Michigan."
        />
        <Faq
          q="Where is the park?"
          a="Planned for the corner of Maiden Lane & Hollywood Road in St. Joseph Charter Township, MI. Mailing address: 1816 Nash Dr., St. Joseph, MI 49085."
        />
        <Faq
          q="What sports will the park support?"
          a="Rocket Football, Flag Football, Baseball, and Softball for ages 5–18 and every skill level. One of the two softball fields will be a designated Miracle League field with composite turf for wheelchair accessibility."
        />
        <Faq
          q="What is being built?"
          a="Nearly 40 acres with 9 athletic fields (including a Miracle League field), locker rooms, medical room, indoor batting cages, concessions, an accessible playground and splash pad, a 1.5-mile walking and fitness trail, a pavilion, and parking."
        />
        <Faq
          q="Is the park accessible?"
          a="Yes. Accessible fields and dugouts are designed in from the first drawings, including a Miracle League field with special composite turf for wheelchair accessibility. When SJYSF started, there was no accessible field or dugout within 55 miles of the community."
        />
        <Faq
          q="Who maintains the park when it is finished?"
          a="St. Joseph Charter Township will maintain it as a public park. SJYSF will continue to oversee it and raise funds for future improvements."
        />
        <Faq
          q="How do I contact the Foundation?"
          a={
            <>
              Call <a href="tel:2694146048">269-414-6048</a>, email{" "}
              <a href="mailto:sjyouthsports@gmail.com">sjyouthsports@gmail.com</a>, message Facebook
              or Instagram, or use the contact form on the website.
            </>
          }
        />
        <Faq
          q="Who is on the board?"
          a="Nicole Schmitt (President), Ryan Cheevers (Vice President), Nanci Fenrick (Secretary / Treasurer), Paul Knapp (Community Outreach), and Michael Fernandez (Fundraising Director)."
        />
      </PolicySection>

      <PolicySection title="Related policies">
        <p style={{ margin: 0, color: "#3A4554" }}>
          Read our{" "}
          <Link href="/privacy-policy" style={{ fontWeight: 800, color: "#00214D" }}>
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/ai-policy" style={{ fontWeight: 800, color: "#00214D" }}>
            AI Policy
          </Link>{" "}
          for how we handle information and technology.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
