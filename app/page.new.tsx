'use client';

import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import FeatureCard from '@/app/components/FeatureCard';
import Footer from '@/app/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome to Business Analysis Academy</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master the skills you need to become a successful business analyst with our comprehensive courses and resources.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/courses" className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors text-center">
                Browse Courses
              </Link>
              <Link href="/about" className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg hover:bg-pink-50 transition-colors text-center">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Academy?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Expert Instructors"
                description="Learn from industry professionals with years of experience in business analysis."
                icon="👨‍🏫"
              />
              <FeatureCard
                title="Practical Skills"
                description="Gain hands-on experience with real-world business analysis projects."
                icon="🛠️"
              />
              <FeatureCard
                title="Flexible Learning"
                description="Study at your own pace with our online courses and resources."
                icon="⏱️"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "The Business Analysis Academy transformed my career. The practical skills I learned helped me land my dream job within weeks of completing the course."
              </blockquote>
              <div className="flex items-center">
                <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center text-pink-600 font-bold text-xl mr-4">
                  JS
                </div>
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-gray-600">Senior Business Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-pink-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who have advanced their careers with our business analysis courses.
            </p>
            <Link 
              href="/auth" 
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
