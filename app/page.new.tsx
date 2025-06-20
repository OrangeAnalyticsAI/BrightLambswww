'use client';

import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import FeatureCard from '@/app/components/FeatureCard';
import Footer from '@/app/components/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-pink-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold text-gray-800">
              Welcome to Business Analysis Academy
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Master the skills you need to become a successful business analyst with our
              comprehensive courses and resources.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/courses"
                className="rounded-lg bg-pink-600 px-8 py-3 text-center text-white transition-colors hover:bg-pink-700"
              >
                Browse Courses
              </Link>
              <Link
                href="/about"
                className="rounded-lg border-2 border-pink-600 bg-white px-8 py-3 text-center text-pink-600 transition-colors hover:bg-pink-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Our Academy?</h2>
            <div className="grid gap-8 md:grid-cols-3">
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
            <h2 className="mb-12 text-center text-3xl font-bold">What Our Students Say</h2>
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
              <blockquote className="mb-4 text-xl italic text-gray-700">
                "The Business Analysis Academy transformed my career. The practical skills I learned
                helped me land my dream job within weeks of completing the course."
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-xl font-bold text-pink-600">
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
        <section className="bg-pink-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold">Ready to Start Your Journey?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl">
              Join thousands of students who have advanced their careers with our business analysis
              courses.
            </p>
            <Link
              href="/auth"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-pink-600 transition-colors hover:bg-pink-50"
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
