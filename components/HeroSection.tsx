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
      <div className="absolute inset-0 -z-10 bg-green-50">
        <div className="container mx-auto h-full max-w-5xl bg-green-50"></div>
      </div>

      {/* Container with max width and horizontal padding */}
      <div className="container mx-auto h-full px-4">
        {/* Video Background Container */}
        <div className="relative mx-auto h-full w-full max-w-5xl overflow-hidden rounded-lg shadow-lg">
          {/* Video */}
          <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-4 text-center">
              <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl">
                <span className="block">{title}</span>
                <span className="block text-blue-200">{highlight}</span>
                <span className="mt-2 block text-lg font-normal text-gray-200 md:text-xl lg:text-2xl">
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
