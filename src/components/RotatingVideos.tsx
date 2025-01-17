'use client';

import React, { useState, useEffect, useRef } from 'react';

const testVideoSources = [
  '/h1.webm', '/h2.webm', '/h3.webm'
];

export default function TestVideos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testVideoSources.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === activeIndex) {
          videoRef.play().catch(err => console.error('Error playing video:', err));
        } else {
          videoRef.pause();
          videoRef.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="mt-12 flex justify-center relative">
      {testVideoSources.map((src, index) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[index] = el; }}
          src={src}
          width={200}
          height={350}
          className={`absolute rounded-lg transition-all duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
        />
      ))}
    </div>
  );
}
