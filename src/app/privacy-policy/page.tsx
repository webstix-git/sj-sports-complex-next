import type { Metadata } from "next";
import PolicyPageShell, { PolicySection } from "@/components/PolicyPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | St. Joseph Youth Sports Foundation",
  description:
    "How St. Joseph Youth Sports Foundation collects, uses, and protects personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      updated="November 23, 2026"
      lead="St. Joseph Youth Sports Foundation (“SJYSF,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect on our website, how we use it, and the choices you have."
    >
      <PolicySection title="Information We Collect">
        <p>We may collect:</p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>Contact details you submit (name, email, phone, message content)</li>
          <li>Sponsorship or volunteer interest details you choose to share</li>
          <li>Basic technical data such as browser type, device, and pages visited</li>
          <li>Location information you provide when requesting directions or contacting us</li>
        </ul>
      </PolicySection>

      <PolicySection title="How We Use Information">
        <p>We use information to:</p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>Respond to questions, sponsorship inquiries, and volunteer requests</li>
          <li>Operate and improve this website and our community communications</li>
          <li>Support planning, fundraising, and construction of the youth sports park</li>
          <li>Comply with legal obligations and protect the Foundation and our community</li>
        </ul>
      </PolicySection>

      <PolicySection title="Children’s Privacy">
        <p>
          Our website is intended for parents, coaches, sponsors, and community members. We do not
          knowingly collect personal information from children under 13 through this site. If you
          believe a child has provided personal information to us, contact us and we will delete it.
        </p>
      </PolicySection>

      <PolicySection title="Sharing of Information">
        <p>
          We do not sell personal information. We may share information with trusted service
          providers who help us operate email, hosting, analytics, or mapping tools, and only as
          needed to provide those services. We may also disclose information when required by law.
        </p>
      </PolicySection>

      <PolicySection title="Cookies & Analytics">
        <p>
          Our site may use cookies or similar technologies to understand how visitors use the site
          and to improve performance. You can control cookies through your browser settings.
        </p>
      </PolicySection>

      <PolicySection title="Data Retention">
        <p>
          We keep contact and inquiry information only as long as needed to respond, maintain
          records for Foundation operations, or meet legal requirements.
        </p>
      </PolicySection>

      <PolicySection title="Your Choices">
        <p>
          You may request access to, correction of, or deletion of personal information you have
          provided by contacting us. You can also opt out of non-essential communications at any
          time.
        </p>
      </PolicySection>

      <PolicySection title="Contact">
        <p>
          Questions about this Privacy Policy can be sent to{" "}
          <a href="mailto:sjyouthsports@gmail.com">sjyouthsports@gmail.com</a> or by calling{" "}
          <a href="tel:2694146048">269-414-6048</a>.
        </p>
        <p>
          Mailing address:{" "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=1816+Nash+Dr,+St.+Joseph,+MI+49085"
            target="_blank"
            rel="noopener noreferrer"
          >
            1816 Nash Dr., St. Joseph, MI 49085
          </a>
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
