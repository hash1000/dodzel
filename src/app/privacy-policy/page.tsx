import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy Policy", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro="How Dodzel Engineering handles information when you visit our website or contact our team." sections={[
    { id: "scope", title: "About this policy", paragraphs: [
      "This policy describes how Dodzel Engineering Limited handles personal information in connection with this website and enquiries sent to our team. Separate notices or agreements may apply to employment, supplier relationships and client projects.",
    ] },
    { id: "information", title: "Information you provide", paragraphs: [
      "When you email us, you provide your email address, your message and any attachments. Your correspondence may also include your name, company, phone number and project requirements. Please share only information needed for your enquiry and ensure you are authorised to share information about other people.",
      "The website’s quote request form asks for your name, company, email, phone number, sector, service and project scope, with an optional supporting file. Currently, the form is a validation preview: information is sent to the website server for validation but is not delivered to our team or saved as a quote request. A successful validation does not mean an enquiry has been received. Please email us to discuss a project.",
    ] },
    { id: "technical-information", title: "Technical information and storage", paragraphs: [
      "When you visit the website, hosting and infrastructure services may process technical information such as your IP address, browser, requested pages and request times to deliver and protect the service. Quote validation logs record the selected sector, service and whether a file was attached; the form handler does not log personal contact details or file contents.",
      "The website uses session storage to remember whether the introductory loading animation has already played during your browser session. When review mode is selected, a cookie named dodzel-review remembers that display preference for up to 30 days. You can clear cookies and website storage through your browser settings; doing so may reset these preferences.",
    ] },
    { id: "use", title: "How information is used", paragraphs: [
      "Information provided in correspondence is used to respond to enquiries, understand project requirements and manage business communications. Technical information supports website delivery, troubleshooting and security. The quote preview uses the information entered to check that the request meets the form’s requirements.",
    ] },
    { id: "sharing", title: "Service providers and disclosures", paragraphs: [
      "Website hosting, infrastructure and email providers may process information as part of providing their services. Information may also need to be disclosed where required by law or to address fraud, security incidents or the protection of legal rights. Provider systems may process information in countries other than your own.",
      "Links to group companies or other external websites take you to services with their own privacy practices. Review their policies before providing personal information.",
    ] },
    { id: "retention", title: "Retention and security", paragraphs: [
      "Business correspondence may be retained for the enquiry or relationship and any applicable recordkeeping needs. Retention of infrastructure logs depends on the service provider. The quote preview does not create a stored enquiry or retain the uploaded file through its form handler.",
      "No online transmission or storage method can be guaranteed completely secure. Avoid sending passwords, payment details or unnecessary sensitive personal information through the quote form or ordinary email.",
    ] },
    { id: "choices", title: "Your choices and requests", paragraphs: [
      "You can choose whether to contact us or use the quote preview and can control browser storage through your browser settings. You can contact us to ask about personal information you have provided, request a correction or request deletion. We will consider requests in line with applicable requirements and may need to verify your identity or retain information for legitimate recordkeeping obligations.",
    ] },
    { id: "updates", title: "Updates to this policy", paragraphs: [
      "This policy may be updated as the website and its information handling change. The date above identifies the latest revision. Please revisit this page when using the website or submitting information.",
    ] },
  ]} />;
}
