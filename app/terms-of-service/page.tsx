export const metadata = {
  title: 'Terms of Service - Bright Lambs',
  description: 'Terms and conditions governing the use of our services and website.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose dark:prose-invert max-w-none rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
          <h1 className="mb-2 text-center text-3xl font-bold">Terms of Service</h1>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Definitions and Interpretation</h2>
          <p className="mb-4">
            <span className="font-semibold">"Client"</span> refers to the party receiving services
            from Bright Lambs Ltd.
            <br />
            <span className="font-semibold">"Consultant"</span> refers to Bright Lambs Ltd and its
            authorised personnel.
            <br />
            <span className="font-semibold">"Agreement"</span> refers to these Terms of Service
            (ToS) and any accompanying Statement of Work (SoW) or Service Level Agreements.
            <br />
            <span className="font-semibold">"Services"</span> refers to the consulting services
            described in the relevant SoW or proposal.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Scope of Services</h2>
          <p className="mb-6">
            Bright Lambs Ltd provides business analysis and consultancy services, including but not
            limited to process improvement, technology adoption, digital transformation, and AI
            strategy. Specific services and deliverables will be detailed in an individual Statement
            of Work (SoW).
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">3. Engagement and Deliverables</h2>
          <p className="mb-6">
            Services commence upon written agreement (email or signature) and are governed by this
            ToS and the corresponding SoW or SLA. Deliverables will be clearly defined in the SoW or
            SLA. Any additional work beyond the agreed scope must be authorised through a written
            change request.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">4. Client Responsibilities</h2>
          <p className="mb-2">The Client agrees to:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Provide timely access to relevant personnel, systems, data, and documentation.</li>
            <li>Ensure decisions and approvals are made promptly to avoid delays.</li>
            <li>Take responsibility for internal decision-making based on our recommendations.</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">5. Fees and Payment</h2>
          <p className="mb-4">
            Fees will be set out in the SoW and may be charged on a daily, hourly, or fixed basis.
            <br />
            Invoices are payable within 14 days unless otherwise stated. Late payments may incur
            interest at 2% per month above the Bank of England base rate. Reasonable expenses may be
            charged with prior client approval.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Confidentiality</h2>
          <p className="mb-6">
            Both parties agree to maintain strict confidentiality regarding all proprietary and
            non-public information shared during the engagement. This obligation survives
            termination.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">7. Intellectual Property</h2>
          <p className="mb-6">
            Bright Lambs Ltd retains ownership of all pre-existing IP, methodologies, templates, and
            tools. IP specifically created for and paid by the Client will be assigned to the Client
            upon full payment, unless otherwise stated in the SoW.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">8. Data Protection & GDPR</h2>
          <p className="mb-6">
            We comply with UK GDPR and the Data Protection Act 2018. Both parties agree to process
            personal data lawfully and securely. Our full Privacy Policy is available at{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:underline dark:text-blue-400">
              www.BrightLambs.co.uk/Privacy-policy
            </a>
            .
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">9. Limitation of Liability</h2>
          <p className="mb-6">
            Liability for direct damages is capped at the total fees paid under the applicable SoW.
            Bright Lambs Ltd is not liable for indirect, incidental, or consequential losses
            including loss of profit, data, or reputation.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">10. Termination</h2>
          <p className="mb-6">
            Either party may terminate the engagement with 14 days' written notice. Immediate
            termination may occur in the event of material breach or insolvency. The Client will be
            liable for fees and expenses up to the termination date.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">11. Force Majeure</h2>
          <p className="mb-6">
            Bright Lambs Ltd is not liable for any failure or delay in performance caused by events
            beyond its control, including natural disasters, pandemics, government actions, or
            network outages.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">12. Governing Law and Jurisdiction</h2>
          <p className="mb-6">
            This Agreement shall be governed by the laws of England and Wales. Any disputes shall be
            resolved in the courts of England.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">13. Non-Solicitation</h2>
          <p className="mb-6">
            The Client agrees not to solicit or hire any Bright Lambs Ltd employee or subcontractor
            involved in the engagement for a period of 12 months following the end of the engagement
            without prior written consent.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">
            14. Change Requests and Scope Management
          </h2>
          <p className="mb-6">
            All changes to the agreed scope must be documented and approved in writing. Additional
            charges may apply for out-of-scope work.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">15. Subcontracting</h2>
          <p className="mb-6">
            Bright Lambs Ltd may engage trusted subcontractors or associates to deliver parts of the
            service. We remain fully responsible for the quality and conduct of our subcontractors.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">16. Dispute Resolution</h2>
          <p className="mb-6">
            In the event of a dispute, both parties agree to first attempt resolution through good
            faith negotiation. If unresolved, either party may escalate to mediation before pursuing
            legal action.
          </p>

          <div className="mt-12 space-y-1 border-t border-gray-200 pt-6 dark:border-gray-700">
            <p>
              Signed: <span className="font-semibold">Bex Smith</span>
            </p>
            <p>
              Position: <span className="font-medium">CEO, Bright Lambs Ltd</span>
            </p>
            <p>
              Date: <span className="font-medium">19 June 2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
