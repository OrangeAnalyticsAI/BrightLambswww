import Link from 'next/link';
import { Users, BarChart, Lightbulb, Target } from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About Bright Lambs
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Empowering businesses with expert analysis and data-driven insights to drive growth and efficiency.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-8">
                At Bright Lambs, we believe that every business deserves access to high-quality business analysis services. 
                Our mission is to provide affordable, expert-level analysis that helps organizations of all sizes make 
                better decisions and achieve their strategic goals.
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <FeatureCard
                  icon={Users}
                  title="Expert Team"
                  description="Our team of certified business analysts brings years of experience across various industries."
                />
                <FeatureCard
                  icon={BarChart}
                  title="Data-Driven"
                  description="We base our recommendations on solid data analysis and industry best practices."
                />
                <FeatureCard
                  icon={Lightbulb}
                  title="Innovative Solutions"
                  description="We stay ahead of industry trends to provide cutting-edge solutions for our clients."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to work with us?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover how our BAaaS solutions can transform your business operations and drive success.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium shadow-lg"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
