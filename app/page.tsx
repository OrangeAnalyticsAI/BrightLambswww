'use client';

import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
// Assuming FeatureCard is still relevant or we might need a simpler card structure based on the screenshot
// For now, let's define a simple card component here if FeatureCard is too complex or not matching
import Footer from '@/app/components/Footer';
import { Wrench, GraduationCap, FileText } from 'lucide-react'; // Example icons

// Simple Card component for "Curated Content" if FeatureCard is not suitable
const CuratedContentCard = ({ title, description, icon: IconComponent }: { title: string; description: string; icon: React.ElementType }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
    <IconComponent className="w-12 h-12 text-pink-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section based on screenshot */}
        <section className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to the Business Analysis Academy <span className="text-pink-500 text-sm align-super">beta</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Whether you're a curious lamb taking your first steps or a seasoned ewe ready 
              to sharpen your horns, this is where your BA journey begins — or continues! 
              We've gathered a flock of free resources to help you build your skills and productivity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                href="/auth?mode=signup" 
                className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors text-lg shadow-md"
              >
                Sign Up
              </Link>
              <Link 
                href="/about" // Assuming 'Learn More' goes to an about page
                className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg hover:bg-pink-50 hover:text-pink-700 transition-colors text-lg shadow-md"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Curated Content Section based on screenshot */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Curated Content
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <CuratedContentCard
                title="Professional Tools"
                description="Reviews of really useful tools for BAs including the latest AI and automation tools."
                icon={Wrench}
              />
              <CuratedContentCard
                title="Expert Tuition"
                description="Either scoured from the internet or created by our own team of experts."
                icon={GraduationCap}
              />
              <CuratedContentCard
                title="Templates"
                description="Download ready to use spreadsheets, documents and process maps."
                icon={FileText}
              />
            </div>
          </div>
        </section>
        
        {/* Optional: Add a CTA or other sections if needed, or keep it clean like the screenshot implies */}

      </main>
      <Footer />
    </div>
  );
}
