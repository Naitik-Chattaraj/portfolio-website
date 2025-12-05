import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// ------------------
// Component Props
// ------------------
interface HangingCardProps {
  images: {
    src: string;
    label: string;
  }[];
}

// ------------------
// Component
// ------------------
export default function HangingCardsSection({ images }: HangingCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth;

    gsap.set(track, { x: 0 });

    gsap.to(track, {
      x: -totalWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}`,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden py-20 relative bg-black text-white"
    >
      {/* Curve Line Above */}
      <svg
        width="100%"
        height="150"
        className="absolute top-0 left-0 pointer-events-none"
      >
        <path
          id="curvyPath"
          d="M0 75 Q 300 0 600 75 T 1200 75 T 1800 75"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Infinite Track */}
      <div
        ref={trackRef}
        className="flex gap-24 items-start absolute top-0 left-0"
      >
        {[...images, ...images].map((img, index) => (
          <div key={index} className="relative flex flex-col items-center group">
            {/* Card */}
            <div className="w-[150px] h-[150px] bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:scale-110">
              <img src={img.src} className="w-full h-full object-cover" />
            </div>

            {/* Rope */}
            <svg width="2" height="70" className="my-1">
              <line x1="1" y1="0" x2="1" y2="70" stroke="white" strokeWidth="2" />
            </svg>

            {/* Hover Label */}
            <div className="opacity-0 group-hover:opacity-100 mt-3 transition-all duration-300 text-center text-sm font-semibold">
              {img.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}