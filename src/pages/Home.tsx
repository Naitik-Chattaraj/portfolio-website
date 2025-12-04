import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import myImage from "../assets/my-image.png";
import "./Home.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";
import LazySpline from "../components/LazySpline";

gsap.registerPlugin(ScrollTrigger);

// GSAP global optimization
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});

ScrollTrigger.defaults({
  fastScrollEnd: true,
});

const Home = () => {
  // Section 2 refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Carousel controls
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  // Section 3 refs
  const sec3Ref = useRef<HTMLDivElement>(null);
  const sec3TextRef = useRef<HTMLDivElement>(null);
  const sec3CarouselRef = useRef<HTMLDivElement>(null);

  // AUTOPLAY PLUGIN
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // ------------------------------
  // SECTION 2 Animations
  // ------------------------------
  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    const anim1 = gsap.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "top 0%",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress >= 0.99 && chatRef.current) {
              gsap.to(chatRef.current, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                visibility: "visible",
                ease: "back.out(1.7)",
              });
            }
          },
        },
      }
    );

    const anim2 = gsap.fromTo(
      textRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "top 0%",
          scrub: true,
        },
      }
    );

    return () => {
      anim1.kill();
      anim2.kill();
    };
  }, []);

  // ------------------------------
  // SECTION 3 Animations
  // ------------------------------
  useEffect(() => {
    if (!sec3Ref.current) return;

    const a1 = gsap.fromTo(
      sec3TextRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sec3Ref.current,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    const a2 = gsap.fromTo(
      sec3CarouselRef.current,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sec3Ref.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    return () => {
      a1.kill();
      a2.kill();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // -----------------------------------------
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <LazySpline />
      </section>

      {/* About Section */}
      <section ref={sectionRef} className="about-section">
        <div ref={imageRef} className="about-image">
          <img src={myImage} alt="Me" />

          <div ref={chatRef} className="chat-bubble">
            Hello World!
          </div>
        </div>

        <div ref={textRef} className="about-text">
          <h2>
            A <span className="litbit">Little bit</span> About Me!
          </h2>
          <p>
            I’m a passionate web developer with a love for creating interactive
            and visually stunning websites.
          </p>

          <div className="liquidGlass-btn">
            <span className="btn-text">Know More</span>
            <div className="liquidGlass-effect"></div>
            <div className="liquidGlass-tint"></div>
            <div className="liquidGlass-shine"></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="sec-3" ref={sec3Ref}>
        <div className="sec-3-text" ref={sec3TextRef}>
          <h2>
            My <span className="litbit">Amazing</span> Projects
          </h2>
          <p>Check out some cool stuff I’ve built.</p>

          <div className="liquidGlass-btn">
            <span className="btn-text">Know More</span>
            <div className="liquidGlass-effect"></div>
            <div className="liquidGlass-tint"></div>
            <div className="liquidGlass-shine"></div>
          </div>
        </div>

        <div className="sec-3-carousel" ref={sec3CarouselRef}>
          <Carousel
            plugins={[plugin.current]}
            className="carousel w-full max-w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="card">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious ref={prevBtnRef} />
            <CarouselNext ref={nextBtnRef} />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;
