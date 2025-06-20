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
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">Our Services</h2>
            <div className="mx-auto h-1 w-20 bg-blue-600"></div>
          </div>

          <ServicesGrid services={services} />
        </div>
      </section>
    </div>
  );
}
