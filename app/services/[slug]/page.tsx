import { notFound, redirect } from 'next/navigation';
import { services } from '../services-data';

// This tells Next.js to generate these pages at build time
export const dynamicParams = false;

// This function tells Next.js which paths should be statically generated at build time
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  // In development, we can use client-side navigation
  if (process.env.NODE_ENV !== 'production') {
    // Check if this is a special case for strategic-enterprise-analysis
    if (params.slug === 'strategic-enterprise-analysis') {
      redirect('/services/strategic-enterprise-analysis');
      return null;
    }
  }

  // For other services, use the generic template
  const service = services.find(s => s.slug === params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-700 px-6 py-12 sm:px-12 text-center">
            <h1 className="text-3xl font-bold text-white">{service.title}</h1>
            <p className="mt-4 text-lg text-indigo-100">{service.description}</p>
          </div>
          
          <div className="px-6 py-12 sm:px-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Service Details</h2>
            <ul className="space-y-4">
              {service.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
            

          </div>
        </div>
      </div>
    </div>
  );
}

// This tells Next.js to revalidate these pages every hour
// Set to false if you don't want incremental static regeneration
export const revalidate = 3600; // 1 hour
