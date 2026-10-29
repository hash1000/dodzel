import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Terms & Conditions", "/terms-and-conditions");

export default function TermsAndConditionsPage() {
  return <LegalPage title="Terms & Conditions" intro="The terms for accessing this website and using Dodzel Engineering’s online information and enquiry tools." sections={[
    { id: "website", title: "Using this website", paragraphs: [
      "These terms apply to your use of the Dodzel Engineering Limited website. By using the website, you agree to these terms. If you do not agree, please stop using the website. Questions about these terms can be sent to the contact details below.",
    ] },
    { id: "information", title: "Website information", paragraphs: [
      "Website content provides general information about our company, sectors and capabilities. It is not project-specific engineering, technical or professional advice. Obtain appropriate advice and written confirmation from our team before relying on information for a project or commercial decision.",
      "We may update or correct website content. Service descriptions and other information do not guarantee availability, suitability for a particular project or a commitment to supply services.",
    ] },
    { id: "enquiries", title: "Enquiries and quotations", paragraphs: [
      "Submitting an enquiry or discussing a project does not create a contract, confirmed quotation or obligation to undertake work. Project scope, pricing, timelines and responsibilities must be agreed separately in writing by authorised representatives. A signed project agreement governs the services covered by that agreement.",
      "The quote request form currently validates entries as a preview. It does not send the request to our team or create a quotation. A validation message is not confirmation of receipt. Please email us directly for project enquiries.",
    ] },
    { id: "acceptable-use", title: "Acceptable use", paragraphs: [
      "Use the website lawfully and provide accurate information when communicating with us. Do not attempt unauthorised access, disrupt the website, upload malicious files, impersonate others or use the website to infringe another person’s rights.",
      "Only share documents and information you have authority to provide. Avoid submitting unnecessary personal information or confidential third-party materials without appropriate permission.",
    ] },
    { id: "ownership", title: "Intellectual property", paragraphs: [
      "Website text, branding, designs, photographs and other materials belong to Dodzel Engineering or their respective owners and licensors. You may view the website and keep copies for your internal evaluation of our services. Any wider reproduction, distribution or commercial use requires permission from the relevant rights holder, except where permitted by law.",
      "Third-party names and marks remain the property of their respective owners. Their appearance on this website does not grant a licence to use them.",
    ] },
    { id: "external-links", title: "External websites", paragraphs: [
      "Links to group companies and other third-party websites are provided for convenience. Those websites operate under their own terms and privacy policies. We do not control their content or availability, and a link alone does not constitute an endorsement of everything on the linked website.",
    ] },
    { id: "availability", title: "Availability and responsibility", paragraphs: [
      "We aim to keep this website useful and accessible but cannot guarantee uninterrupted access or that every item will always be complete, current or free from errors. Access may be interrupted for maintenance, technical issues or other reasons.",
      "To the extent permitted by applicable law, Dodzel Engineering is not responsible for indirect or consequential losses arising from use of, or inability to use, this website or reliance on its general information. Nothing in these terms excludes or limits liability or rights that cannot lawfully be excluded or limited.",
    ] },
    { id: "privacy", title: "Personal information", paragraphs: [
      "Our Privacy Policy explains the handling of information connected with website visits, correspondence and the quote validation preview. Please review it before providing personal information.",
    ] },
    { id: "changes", title: "Changes to these terms", paragraphs: [
      "We may revise these terms to reflect website or business changes. Revised terms will appear on this page with an updated date and apply to subsequent website use. These website terms do not replace an existing signed project agreement.",
    ] },
  ]} />;
}
