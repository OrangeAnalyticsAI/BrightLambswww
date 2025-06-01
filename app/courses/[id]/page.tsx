'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import Link from 'next/link';

// Components
import { CourseHeader } from '@/components/courses/CourseHeader';
import { CourseDetailSidebar } from '@/components/courses/CourseDetailSidebar';
import { CourseActions } from '@/components/courses/CourseActions';

// Types
import { Course } from '@/components/courses/types';

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth');
          return;
        }

        // Fetch course data
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) {
          router.push('/404');
          return;
        }

        setCourse(data);

        // Check if user is instructor
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        setIsInstructor(profile?.user_type === 'contributor' || profile?.user_type === 'admin');

        // Fetch user progress
        const { data: progress } = await supabase
          .from('user_progress')
          .select('completed_lessons')
          .eq('user_id', user.id)
          .eq('course_id', id)
          .single();

        if (progress?.completed_lessons) {
          setCompletedLessons(progress.completed_lessons);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course');
        router.push('/courses');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, router]);

  const toggleLessonComplete = async (lessonId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const isCompleted = completedLessons.includes(lessonId);
      let newCompletedLessons: string[];

      if (isCompleted) {
        // Remove from completed
        newCompletedLessons = completedLessons.filter(id => id !== lessonId);
      } else {
        // Add to completed
        newCompletedLessons = [...completedLessons, lessonId];
      }

      setCompletedLessons(newCompletedLessons);

      // In a real app, you would save this to the database
      // await supabase
      //   .from('user_progress')
      //   .upsert({
      //     user_id: user.id,
      //     course_id: id,
      //     completed_lessons: newCompletedLessons,
      //     updated_at: new Date().toISOString(),
      //   });
    } catch (error) {
      console.error('Error toggling lesson completion:', error);
      toast.error('Failed to update lesson status');
    }
  };

  const handleDeleteCourse = async () => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Course deleted successfully');
      router.push('/courses');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader />
      
      {/* Course Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="mt-2 text-sm text-gray-500">
                {course.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {course.categories?.map((category, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {category}
                  </span>
                ))}
                {course.is_premium && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Premium
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <CourseActions 
                courseId={course.id} 
                isInstructor={isInstructor} 
                onDeleteAction={handleDeleteCourse} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CourseDetailSidebar
              course={course}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              completedLessons={completedLessons}
              onLessonComplete={toggleLessonComplete}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {course.is_premium ? 'Premium' : 'Free'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.duration || 'Self-paced'}
                    </span>
                  </div>
                  
                  <CourseActions 
                    courseId={course.id}
                    isInstructor={isInstructor}
                    onDeleteAction={handleDeleteCourse}
                  />
                </div>
                
                <div className="prose max-w-none">
                  {activeSection === 'overview' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                      <div dangerouslySetInnerHTML={{ __html: course.content || 'No content available.' }} />
                    </div>
                  )}
                  
                  {activeSection === 'curriculum' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                      <p>Coming soon...</p>
                    </div>
                  )}
                  
                  {activeSection === 'resources' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Course Resources</h2>
                      <p>No resources available yet.</p>
                    </div>
                  )}
                  
                  {activeSection === 'discussion' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Discussion</h2>
                      <p>Discussion feature coming soon!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
