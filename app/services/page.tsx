'use client';

import { services } from './services-data';
import { ServicesGrid } from '../../components/ServicesGrid';
import HeroSection from '../../components/HeroSection';

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <HeroSection
        title="Clarity over the complex."
        highlight="Certainty in what comes next."
        subtitle="Business Analysis as a Service (BAaaS)"
        videoSrc="/Videos/Little Lambs running video.mp4"
      />

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Our Services</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <ServicesGrid services={services} />
        </div>
      </section>
    </div>
  );
}
