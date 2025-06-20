export const metadata = {
  title: 'Privacy Policy - Bright Lambs',
  description:
    'Learn how we collect, use, and protect your personal information in accordance with data protection laws.',
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="prose dark:prose-invert max-w-none rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8">
          <h1 className="mb-2 text-center text-3xl font-bold">Privacy Policy – Bright Lambs Ltd</h1>
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
            Effective date: {formattedDate}
          </p>

          <p className="mb-6">
            Bright Lambs Ltd ("we", "our", "us") is committed to protecting your personal data and
            respecting your privacy. This policy explains what personal information we collect, how
            we use it, and your rights under the UK General Data Protection Regulation (UK GDPR) and
            Data Protection Act 2018.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Who We Are</h2>
          <p className="mb-6">
            Bright Lambs Ltd is a UK-based business analysis consultancy, providing services to
            organisations to improve their operations, adopt new technologies, and implement digital
            transformation strategies.
          </p>
          <p className="mb-6">
            Our contact details are available on our{' '}
            <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
              Contact Us
            </a>{' '}
            page.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">2. What Data We Collect</h2>
          <p className="mb-4">
            We may collect and process the following categories of personal data:
          </p>

          <h3 className="mb-3 mt-6 text-xl font-semibold">a) Clients and Prospects</h3>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Name</li>
            <li>Job title</li>
            <li>Company name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Project-related communications and files</li>
          </ul>

          <h3 className="mb-3 mt-6 text-xl font-semibold">b) Website Visitors</h3>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Contact form submissions</li>
            <li>IP address</li>
            <li>Browser type and device data</li>
            <li>Website usage statistics (via cookies or analytics tools)</li>
          </ul>

          <h3 className="mb-3 mt-6 text-xl font-semibold">c) Newsletter Subscribers</h3>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Email address</li>
            <li>Preferences and engagement data</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">3. How We Use Your Data</h2>
          <p className="mb-4">We use personal data for the following purposes:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>To respond to enquiries or provide requested services</li>
            <li>To manage client relationships and project delivery</li>
            <li>To send updates, insights, or marketing communications (only with your consent)</li>
            <li>To improve our website and services</li>
            <li>To meet legal and regulatory obligations</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">4. Legal Bases for Processing</h2>
          <p className="mb-4">We process data under the following lawful bases:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Contractual necessity (e.g., delivering our services)</li>
            <li>Legitimate interest (e.g., managing our business, improving services)</li>
            <li>Consent (e.g., for marketing communications)</li>
            <li>Legal obligation (e.g., tax and audit requirements)</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">
            5. Marketing and Communication Preferences
          </h2>
          <p className="mb-6">
            If you submit your details via our website or email, you may receive follow-up emails
            from us. You can unsubscribe or update your preferences at any time via the link in the
            email or by contacting us directly.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">6. Data Sharing</h2>
          <p className="mb-6">We only share personal data with:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Trusted service providers (e.g., email, hosting, CRM)</li>
            <li>Legal or regulatory authorities when required</li>
          </ul>
          <p className="mb-6">All third parties are bound by strict data protection terms.</p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">7. International Transfers</h2>
          <p className="mb-6">
            Where we use services that store data outside the UK, we ensure that appropriate
            safeguards are in place (e.g., standard contractual clauses or adequacy decisions).
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">
            8. How We Store and Protect Your Data
          </h2>
          <p className="mb-4">
            We take data protection seriously and apply appropriate technical and organisational
            measures, including:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Secure cloud storage</li>
            <li>Restricted access controls</li>
            <li>Encryption and authentication protocols</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">9. How Long We Keep Data</h2>
          <p className="mb-4">We retain personal data only for as long as necessary:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Client project data: 7 years (for legal/accounting purposes)</li>
            <li>Website contact form submissions: 12 months</li>
            <li>Mailing list subscriptions: until unsubscribed</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">10. Your Rights</h2>
          <p className="mb-4">Under UK GDPR, you have the right to:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing</li>
            <li>Withdraw consent at any time</li>
            <li>Request data portability</li>
          </ul>
          <p className="mb-6">
            To exercise your rights, email{' '}
            <a
              href="mailto:privacy@brightlambs.co.uk"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              privacy@brightlambs.co.uk
            </a>
            .
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">11. Cookies</h2>
          <p className="mb-6">
            Our website may use cookies to enhance user experience and analyse usage. You can
            control cookie settings via your browser.
          </p>
          <p className="mb-6">
            For more information, see our{' '}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
              Cookie Policy
            </a>{' '}
            (or request a copy via email).
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">12. Changes to This Policy</h2>
          <p className="mb-6">
            We only retain personal data for as long as necessary to fulfil the purpose it was
            collected for, including for legal or reporting requirements.
          </p>

          <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-700">
            <p className="mb-2">
              Last updated: <span className="font-medium">{formattedDate}</span>
            </p>
            <p className="mb-2">
              Approved by: <span className="font-semibold">Bex Smith</span>
            </p>
            <p>
              Position: <span className="font-medium">CEO, Bright Lambs Ltd</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
