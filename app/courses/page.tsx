'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Link from 'next/link';

// Components
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { CourseHeader } from '@/components/courses/CourseHeader';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseListSkeleton } from '@/components/courses/CourseListSkeleton';
import { NoCoursesFound } from '@/components/courses/NoCoursesFound';

// Types
import { Course } from '@/components/courses/types';

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'business-analysis', name: 'Business Analysis' },
    { id: 'requirements', name: 'Requirements Engineering' },
    { id: 'process-modeling', name: 'Process Modeling' },
    { id: 'data-analysis', name: 'Data Analysis' },
    { id: 'agile', name: 'Agile & Scrum' },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch user profile and courses
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        // In a real app, you would fetch the user profile from your database
        // This is a simplified version
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          // Create a default profile if it doesn't exist
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id, 
                email: user.email,
                user_type: 'student',
                created_at: new Date().toISOString()
              }
            ])
            .select()
            .single();

          if (createError) throw createError;
          setIsInstructor(false);
        } else {
          setIsInstructor(profile.user_type === 'instructor' || profile.user_type === 'admin');
        }

        await fetchCourses();
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        toast.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    // Set up real-time subscription for course updates
    const channel = supabase
      .channel('courses_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'courses' },
        () => {
          fetchCourses();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      
      let query = supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply category filter
      if (selectedCategory !== 'all') {
        query = query.contains('categories', [selectedCategory]);
      }

      // Apply search query
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      // Apply premium filter
      if (selectedCategories.includes('free') && !selectedCategories.includes('premium')) {
        query = query.eq('is_premium', false);
      } else if (selectedCategories.includes('premium') && !selectedCategories.includes('free')) {
        query = query.eq('is_premium', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleSearch = () => {
    fetchCourses();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset pagination when changing categories
    fetchCourses();
  };

  const handleCourseDeleted = () => {
    fetchCourses();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading your courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <CourseSidebar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            isInstructor={isInstructor}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onSearch={handleSearch}
          />
          
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Courses' : 
                   `Category: ${categories.find(c => c.id === selectedCategory)?.name || selectedCategory}`}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {courses.length} {courses.length === 1 ? 'course' : 'courses'} found
                </p>
              </div>
              
              {isInstructor && (
                <Link
                  href="/courses/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create New Course
                </Link>
              )}
            </div>

            {/* Course Grid */}
            {loadingCourses ? (
              <CourseListSkeleton />
            ) : courses.length === 0 ? (
              <NoCoursesFound 
                searchQuery={searchQuery} 
                selectedCategory={selectedCategory} 
                isInstructor={isInstructor} 
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    isInstructor={isInstructor}
                    onCourseDeleted={handleCourseDeleted}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}