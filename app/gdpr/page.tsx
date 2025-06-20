export const metadata = {
  title: 'GDPR Statement - Bright Lambs',
  description:
    'Our commitment to data protection and your rights under the UK GDPR and Data Protection Act 2018.',
};

export default function GDPRPage() {
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
          <h1 className="mb-2 text-center text-3xl font-bold">Bright Lambs – GDPR Statement</h1>

          <p className="mb-6">
            At Bright Lambs Ltd, we are fully committed to protecting the privacy and security of
            our clients, partners, and website visitors. We comply with the UK General Data
            Protection Regulation (UK GDPR) and the Data Protection Act 2018 in handling all
            personal data.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Data Collection and Purpose</h2>
          <p className="mb-6">
            We collect and process personal data solely for the purpose of delivering our services,
            communicating effectively with clients, and improving our offerings. This may include
            names, contact details, business information, and any relevant data shared with us
            during engagements.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Lawful Basis for Processing</h2>
          <p className="mb-6">
            We process data on the basis of legitimate interest, contractual necessity, and consent.
            Any marketing or non-essential communications are only sent with explicit consent, and
            individuals may withdraw their consent at any time.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Contact Forms and Communications</h2>
          <p className="mb-6">
            If you contact us via our website or any other channel, we may use your details to
            respond to your enquiry or follow up with relevant information. You can unsubscribe from
            further communications at any time by following the instructions in our emails or by
            contacting us directly.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Data Storage and Security</h2>
          <p className="mb-6">
            All personal data is stored securely and only accessible to those who need it to perform
            their roles. We implement strong technical and organisational measures to prevent
            unauthorised access, loss, or misuse of data.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Data Sharing</h2>
          <p className="mb-6">
            We do not sell, rent, or trade personal data. Where necessary, we may share data with
            trusted third-party providers who help us deliver our services, always under strict data
            protection agreements.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Data Subject Rights</h2>
          <p className="mb-4">Under GDPR, you have the right to:</p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (where applicable)</li>
            <li>Object to or restrict certain types of processing</li>
            <li>Port your data to another provider</li>
            <li>Withdraw consent for communications at any time</li>
          </ul>
          <p className="mb-6">
            To exercise any of these rights, please contact us at{' '}
            <a
              href="mailto:privacy@brightlambs.co.uk"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              privacy@brightlambs.co.uk
            </a>
            .
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">Retention</h2>
          <p className="mb-6">
            We only retain personal data for as long as necessary to fulfil the purpose it was
            collected for, including for legal or reporting requirements.
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
