'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Components
import { CourseForm } from '@/components/courses/CourseForm';
import { CourseHeader } from '@/components/courses/CourseHeader';

// Types
import { Course } from '@/components/courses/types';

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [isInstructor, setIsInstructor] = useState(false);
  const [categories, setCategories] = useState([
    { id: 'business-analysis', name: 'Business Analysis' },
    { id: 'requirements', name: 'Requirements Engineering' },
    { id: 'process-modeling', name: 'Process Modeling' },
    { id: 'data-analysis', name: 'Data Analysis' },
    { id: 'agile', name: 'Agile & Scrum' },
  ]);

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

        // Check if user is instructor
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (profile?.user_type !== 'instructor' && profile?.user_type !== 'admin') {
          toast.error('You do not have permission to edit courses');
          router.push('/courses');
          return;
        }

        setIsInstructor(true);

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

  const handleSubmit = async (courseData: Omit<Course, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('courses')
        .update({
          ...courseData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Course updated successfully!');
      router.push(`/courses/${id}`);
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isInstructor || !course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseHeader />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Course
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Update the course details below.
              </p>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <CourseForm 
                categories={categories}
                initialData={course}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onCancel={() => router.push(`/courses/${id}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
