'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';

// Components
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { CourseHeader } from '@/components/courses/CourseHeader';
import { CourseCard } from '@/components/courses/CourseCard';
import { CourseListSkeleton } from '@/components/courses/CourseListSkeleton';
import { NoCoursesFound } from '@/components/courses/NoCoursesFound';
import ViewToggle from '@/components/courses/ViewToggle';
import LessonsList, { Lesson } from '@/components/courses/LessonsList';

// Types
import { Course } from '@/components/courses/types';

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isContributor, setIsContributor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeView, setActiveView] = useState<'courses' | 'lessons'>('courses');
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

  // Fetch user profile, courses, and lessons
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
          setIsContributor(false);
        } else {
          setIsContributor(profile.user_type === 'contributor' || profile.user_type === 'admin');
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
    setLoadingCourses(true);
    try {
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
  
      // Fetch courses when filters change or view changes
      useEffect(() => {
        if (activeView === 'courses') {
          fetchCourses();
        }
      }, [searchQuery, selectedCategory, selectedCategories, activeView]);

      const fetchLessons = async () => {
        setLoadingLessons(true);
        try {
          let query = supabase
            .from('lessons')
            .select('*, courses(title)')
            .order('order_index', { ascending: true });
            
          if (selectedCategory !== 'all') {
            // Join with courses to filter by category
            query = query.eq('courses.categories', selectedCategory);
          }
          
          if (searchQuery) {
            query = query.ilike('title', `%${searchQuery}%`);
          }
          
          const { data, error } = await query;
          
          if (error) throw error;
          
          // Transform the data to match the Lesson interface
          const formattedLessons = data?.map(lesson => ({
            ...lesson,
            course_title: lesson.courses?.title
          })) || [];
          
          setLessons(formattedLessons);
        } catch (error) {
          console.error('Error fetching lessons:', error);
          toast.error('Failed to load lessons');
        } finally {
          setLoadingLessons(false);
        }
      };
  
      // Fetch lessons when filters change or view changes
      useEffect(() => {
        if (activeView === 'lessons') {
          fetchLessons();
        }
      }, [searchQuery, selectedCategory, activeView]);

      const handleCategoryChange = (categoryId: string) => {
        // Toggle the category - if clicking the same category, reset to 'all'
        setSelectedCategory(categoryId === selectedCategory ? 'all' : categoryId);
      };

      const handleSearch = () => {
        if (activeView === 'courses') {
          fetchCourses();
        } else {
          fetchLessons();
        }
      };

      const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedCategories([]);
      };

      if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl">Loading your courses...</div>
          </div>
        );
      }

      return (
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <div className="flex flex-1">
            <CourseSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryChange}
              isInstructor={isContributor}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onSearch={handleSearch}
            />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 sm:mb-0">
                  {selectedCategory === 'all' ? 'All Courses' : 
                   categories.find(c => c.id === selectedCategory)?.name || 'Courses'}
                </h1>
                
                {isContributor && (
                  <Link
                    href="/courses/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                    New Course
                  </Link>
                )}
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <ViewToggle 
                activeView={activeView} 
                onViewChange={(view) => setActiveView(view)} 
              />
              
              {activeView === 'courses' ? (
                loadingCourses ? (
                  <CourseListSkeleton />
                ) : courses.length === 0 ? (
                  <NoCoursesFound 
                    searchQuery={searchQuery} 
                    selectedCategory={selectedCategory} 
                    isInstructor={isContributor}
                    onResetFilters={handleResetFilters}
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {courses.map((course) => (
                      <CourseCard 
                        key={course.id} 
                        course={course} 
                        isInstructor={isContributor}
                        onCourseDeleted={handleSearch}
                      />
                    ))}
                  </div>
                )
              ) : (
                loadingLessons ? (
                  <CourseListSkeleton />
                ) : lessons.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium">No lessons found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
                  </div>
                ) : (
                  <LessonsList lessons={lessons} />
                )
              )}
            </main>
          </div>
        </div>
      );
    }