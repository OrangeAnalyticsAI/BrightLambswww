import Image from 'next/image';
import { ReactNode } from 'react';

interface ServiceDetailProps {
  title: string;
  content: ReactNode[];
  headerContent?: ReactNode;
  imageUrl?: string;
}

export default function ServiceDetail({ title, content, headerContent, imageUrl = '/placeholder-service.jpg' }: ServiceDetailProps) {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-indigo-700 px-6 py-12 sm:px-12">
            <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
            {headerContent}
          </div>
          
          <div className="px-6 py-12 sm:px-12">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                {content.map((section, index) => (
                  <div key={index} className="mb-8">
                    {section}
                  </div>
                ))}
              </div>
              
              <div className="lg:w-1/3">
                <div className="bg-gray-100 rounded-lg p-4 h-full">
                  <div className="aspect-w-4 aspect-h-3 w-full bg-gray-200 rounded-lg overflow-hidden">
                    <Image 
                      src={imageUrl} 
                      alt={title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    [Image description or caption]
                  </div>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
}
