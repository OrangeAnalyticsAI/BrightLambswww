export const metadata = {
  title: 'Anti-slavery and Human Trafficking Policy - Bright Lambs',
  description:
    'Our commitment to preventing modern slavery and human trafficking in our business and supply chains.',
};

export default function AntiSlaveryPolicyPage() {
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
          <h1 className="mb-2 text-center text-3xl font-bold">
            Anti-Slavery and Human Trafficking Policy
          </h1>
          <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
            Last updated: {formattedDate}
          </p>

          <p className="mb-6">
            Bright Lambs Ltd is committed to ensuring that modern slavery and human trafficking have
            no place in our business or supply chains. We uphold the highest standards of ethics and
            integrity in all our operations and relationships.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">1. Our Commitment</h2>
          <p className="mb-6">
            We fully support the aims of the Modern Slavery Act 2015 and are committed to:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>
              Preventing slavery, servitude, forced labour, and human trafficking in all forms.
            </li>
            <li>Promoting transparency in our own business and our supply chains.</li>
            <li>Taking a zero-tolerance approach to modern slavery.</li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">2. Due Diligence and Risk Management</h2>
          <p className="mb-4">
            As a professional services company, our risk of exposure is low. However, we:
          </p>
          <ul className="mb-6 list-disc space-y-2 pl-6">
            <li>Conduct due diligence on suppliers and partners where relevant.</li>
            <li>
              Require suppliers and contractors to confirm their compliance with anti-slavery laws.
            </li>
            <li>
              Reserve the right to terminate any relationship with parties found to be in breach.
            </li>
          </ul>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">
            3. Staff Awareness and Responsibility
          </h2>
          <p className="mb-6">
            All staff are made aware of the risks of modern slavery and are encouraged to raise
            concerns through appropriate channels. Senior management is responsible for ensuring
            this policy is implemented and reviewed annually.
          </p>

          <h2 className="mb-4 mt-8 text-2xl font-semibold">4. Reporting Concerns</h2>
          <p className="mb-6">
            Any concerns related to modern slavery should be reported to
            <a
              href="mailto:ethics@brightlambs.co.uk"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              ethics@brightlambs.co.uk
            </a>{' '}
            in confidence. We will take swift and appropriate action in all cases.
          </p>

          <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-700">
            <p className="mb-2">
              Approved by: <span className="font-semibold">Bex Smith</span>
            </p>
            <p className="mb-2">
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
