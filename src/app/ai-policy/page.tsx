import type { Metadata } from "next";
import PolicyPageShell, { PolicySection } from "@/components/PolicyPageShell";

export const metadata: Metadata = {
  title: "AI Policy | St. Joseph Youth Sports Foundation",
  description:
    "How St. Joseph Youth Sports Foundation uses artificial intelligence responsibly across our website and operations.",
};

export default function AiPolicyPage() {
  return (
    <PolicyPageShell
      eyebrow="Legal"
      title="AI Policy"
      updated="November 23, 2026"
      lead="This AI Policy explains how St. Joseph Youth Sports Foundation (“SJYSF”) may use artificial intelligence tools to support our nonprofit mission while protecting families, athletes, and community trust."
    >
      <PolicySection title="Our Principles">
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>
            <strong>People first:</strong> AI assists our volunteers and board; it does not replace
            human judgment on youth safety, inclusion, or fundraising decisions.
          </li>
          <li>
            <strong>Transparency:</strong> We disclose meaningful AI use that affects visitors or
            program participants.
          </li>
          <li>
            <strong>Privacy:</strong> We avoid feeding sensitive personal or child data into public
            AI tools.
          </li>
          <li>
            <strong>Accuracy:</strong> AI-generated content is reviewed before publication whenever
            it represents the Foundation.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="How We May Use AI">
        <p>AI tools may be used to:</p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>Draft or refine website copy, FAQs, and public communications</li>
          <li>Summarize publicly available materials for internal planning</li>
          <li>Support accessibility improvements such as clearer language</li>
          <li>Help organize non-sensitive operational notes for volunteers</li>
        </ul>
      </PolicySection>

      <PolicySection title="What We Do Not Do">
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>Use AI to make eligibility, safety, or medical decisions about athletes</li>
          <li>Upload rosters, medical forms, or private family records into public AI systems</li>
          <li>Use AI to create deceptive content or impersonate individuals</li>
          <li>Sell data collected for AI training</li>
        </ul>
      </PolicySection>

      <PolicySection title="Human Oversight">
        <p>
          Board members and designated volunteers remain responsible for final review of public
          materials, donor communications, and any AI-assisted content that could affect families or
          partners.
        </p>
      </PolicySection>

      <PolicySection title="Third-Party Tools">
        <p>
          When we use third-party AI or productivity tools, we review their privacy and data-use
          terms and configure settings to limit retention of Foundation data where possible.
        </p>
      </PolicySection>

      <PolicySection title="Updates">
        <p>
          As AI tools and laws evolve, we may update this policy. The date at the top of this page
          shows the latest revision.
        </p>
      </PolicySection>

      <PolicySection title="Contact">
        <p>
          Questions about our AI practices:{" "}
          <a href="mailto:sjyouthsports@gmail.com">sjyouthsports@gmail.com</a> ·{" "}
          <a href="tel:2694146048">269-414-6048</a>
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
