'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// Navigation component
function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session?.user) {
        setUser(session.user);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Business Analysis Academy</Link>
        <div className="space-x-6">
          <Link href="/courses" className="hover:underline hover:text-pink-200 transition-colors">Courses</Link>
          <Link href="/resources" className="hover:underline hover:text-pink-200 transition-colors">Resources</Link>
          {isAuthenticated ? (
            <>
              <Link href="/profile" className="hover:underline hover:text-pink-200 transition-colors">Profile</Link>
              <button 
                onClick={handleSignOut}
                className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              href="/auth" 
              className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Feature Card component
function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-pink-500 mb-4 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-100 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Welcome to the Business Analysis Academy
            <span className="font-mono text-2xl ml-2 text-pink-600">beta</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Whether you're a curious lamb taking your first steps or a seasoned ewe ready to sharpen your horns, 
            this is where your BA journey begins — or continues! We've gathered a flock of free resources to help 
            you build your skills and productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-pink-700 transition-colors text-center"
            >
              Sign Up
            </Link>
            <Link 
              href="/about" 
              className="bg-white text-pink-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors border border-pink-600 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Curated Content</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Professional Tools" 
              description="Reviews of really useful tools for BAs including the latest AI and automation tools." 
              icon="🛠️"
            />
            <FeatureCard 
              title="Expert Tuition" 
              description="Either scoured from the internet or created by our own team of experts." 
              icon="🎓"
            />
            <FeatureCard 
              title="Templates" 
              description="Download ready to use spreadsheets, documents and process maps." 
              icon="📋"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to access premium content?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your journey with our comprehensive courses and resources designed for business analysts at all levels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/courses" 
              className="bg-white text-pink-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors text-center"
            >
              Explore Courses
            </Link>
            {!isAuthenticated && (
              <Link 
                href="/auth" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors text-center"
              >
                Log In / Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Business Analysis Academy</h3>
              <p className="text-gray-400">Empowering the next generation of business analysts</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link>
              <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Business Analysis Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
