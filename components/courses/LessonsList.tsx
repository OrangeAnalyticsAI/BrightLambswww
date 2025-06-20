import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Link as LinkIcon, FileText, Clock } from 'lucide-react';
import Link from 'next/link';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content_type: 'video' | 'youtube' | 'url' | 'text';
  content_url: string;
  content_text?: string;
  course_id: string;
  course_title?: string;
  is_free: boolean;
  duration?: number;
  order_index: number;
  created_at: string;
}

interface LessonsListProps {
  lessons: Lesson[];
  isLoading?: boolean;
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-32 bg-gray-200 dark:bg-gray-800"></CardHeader>
            <CardContent className="mt-4">
              <div className="mb-4 h-6 rounded bg-gray-200 dark:bg-gray-800"></div>
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-800"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium">No lessons found</h3>
        <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getContentTypeIcon = (type: Lesson['content_type']) => {
    switch (type) {
      case 'video':
      case 'youtube':
        return <PlayCircle className="mr-1 h-4 w-4" />;
      case 'url':
        return <LinkIcon className="mr-1 h-4 w-4" />;
      case 'text':
        return <FileText className="mr-1 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => (
        <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
          <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                {lesson.is_free && (
                  <Badge variant="outline" className="ml-2">
                    Free
                  </Badge>
                )}
              </div>
              {lesson.course_title && (
                <CardDescription>From: {lesson.course_title}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-muted-foreground">{lesson.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center">
                {getContentTypeIcon(lesson.content_type)}
                <span className="capitalize">{lesson.content_type}</span>
              </div>
              {lesson.duration && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatDuration(lesson.duration)}
                </div>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default LessonsList;
