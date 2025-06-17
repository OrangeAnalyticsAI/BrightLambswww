'use client';

import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  highlight: string;
  videoSrc: string;
}

export default function HeroSection({ title, subtitle, highlight, videoSrc }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.pause();
      video.currentTime = video.duration - 0.1; // Go to just before the end
    };

    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Green side background */}
      <div className="absolute inset-0 bg-green-50 -z-10">
        <div className="container mx-auto h-full max-w-5xl bg-green-50"></div>
      </div>
      
      {/* Container with max width and horizontal padding */}
      <div className="container mx-auto px-4 h-full">
        {/* Video Background Container */}
        <div className="relative h-full w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                <span className="block">{title}</span>
                <span className="block text-blue-200">{highlight}</span>
                <span className="block text-lg md:text-xl lg:text-2xl font-normal text-gray-200 mt-2">
                  {subtitle}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
