'use client';

import { services } from './services-data';
import { ServicesGrid } from '../../components/ServicesGrid';
import HeroSection from '../../components/HeroSection';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection
        title="Clarity over the complex."
        highlight="Certainty in what comes next."
        subtitle="Business Analysis as a Service (BAaaS)"
        videoSrc="/Videos/Little Lambs running video.mp4"
      />

      {/* Services Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 py-8 px-6 rounded-lg text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">Our Services</h2>
            <div className="mx-auto h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="mx-auto max-w-4xl text-lg text-gray-600 dark:text-gray-300 mb-4">
              Our Business Analysis services are designed to fit seamlessly into your business. Whether you need short-term expertise or a long-term partnership, we offer a range of engagement models to suit your goals, pace, and internal capabilities. Each engagement is underpinned by clear deliverables and governed by a Statement of Work (SoW) or Service Level Agreement (SLA). Alternatively, we can provide services and support on a per diem basis.
            </p>
            <p className="mx-auto max-w-4xl text-lg text-gray-600 dark:text-gray-300 mb-0">
              Here are some of the most common ways organisations engage with us:{' '}
              <a 
                href="/services/engagement-examples" 
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Engagement Examples
              </a>
            </p>
          </div>

          <ServicesGrid services={services} />
        </div>
      </section>
    </div>
  );
}
