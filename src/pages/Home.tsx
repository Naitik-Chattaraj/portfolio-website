import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import HangingCardsSection from "../components/HangingCard";
import Footer from "../components/Footer.tsx";
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
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  // SECTION 1 Animations

const topNodeRef = useRef<HTMLSpanElement>(null);
const lineRef = useRef<HTMLDivElement>(null);
const bottomNodeRef = useRef<HTMLSpanElement>(null);
const iconsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const timer = setTimeout(() => {
    gsap.set(".node.top, .node.bottom", { opacity: 0 });
    gsap.set(".line", { scaleY: 0, transformOrigin: "top center" });
    gsap.set(".social-link", { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(".node.top", { opacity: 1, duration: 0.5 });
    tl.to(".line", { scaleY: 1, duration: 0.7 }, "-=0.2");
    tl.to(".node.bottom", { opacity: 1, duration: 0.5 }, "-=0.2");
    tl.to(
      ".social-link",
      {
        opacity: 1,
        y: 25,
        stagger: { each: 0.2, from: "start" },
        duration: 0.5,
      },
      "-=0.3"
    );
  }, 500); // 0.3s delay — tweak if needed

  return () => clearTimeout(timer);
}, []);


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
      { x: -80, opacity: 0 },
      {
        x: 0,
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
      { x: 120, opacity: 0 },
      {
        x: 0,
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

  // ------------------------------
  // SECTION 4 Animations
  // ------------------------------

const sec4Ref = useRef<HTMLDivElement>(null);
const sec4TextRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!sec4Ref.current) return;

  const ctx = gsap.context(() => {
    gsap.from(sec4TextRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sec4Ref.current,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });
  }, sec4Ref);

  return () => ctx.revert();
}, []);


// Snake

useEffect(() => {
  if (!sec3Ref.current) return;

  const path = document.querySelector("#snakePath") as SVGPathElement | null;
  if (!path) return;

  const length = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: sec3Ref.current,
      start: "top 95%",
      end: "top 5%",
      scrub: 1,
    },
  });
}, []);

//Snake-2

useEffect(() => {
  const path2 = document.querySelector("#snakePath2") as SVGPathElement | null;
  if (!path2) return;

  const length2 = path2.getTotalLength();

  gsap.set(path2, {
    strokeDasharray: length2,
    strokeDashoffset: length2,
  });

  gsap.to(path2, {
    strokeDashoffset: 0,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: document.querySelector(".sec-4"), // section 4 as trigger
      start: "bottom bottom",  // starts when bottom of section hits bottom of viewport
      end: "top top",          // ends when top of section hits top
      scrub: 1,
    },
  });
}, []);



  // -----------------------------------------
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
                <div className="social-line">
          <span ref={topNodeRef} className="node top"></span>
          <div ref={lineRef} className="line"></div>
          <span ref={bottomNodeRef} className="node bottom"></span>

<div ref={iconsRef} className="social-icons">
  <a href="#" className="social-link"><i className="fa-brands fa-instagram"></i></a>
  <a href="#" className="social-link"><i className="fa-brands fa-x-twitter"></i></a>
  <a href="#" className="social-link"><i className="fa-brands fa-linkedin"></i></a>
  <a href="#" className="social-link"><i className="fa-brands fa-github"></i></a>
</div>

        </div>
        <LazySpline />
      </section>
<svg className="snake-svg" width="100vw" height="200px" viewBox="0 0 1200 2000" preserveAspectRatio="none">
  <path id="snakePath"
    d="
      M 1400 -200
      C 1100 0, 1150 200, 900 350
      C 700 500, 1050 700, 800 900
      C 600 1100, 950 1300, 650 1500
      C 350 1700, 300 1850, -300 2000
    "
    stroke="#35185c"
    strokeWidth="26"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
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
          <p>Some of the coolest things I’ve built — crafted with logic, caffeine, and way too much obsession.</p>

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
     
<section className="sec-4" ref={sec4Ref}>
  <div className="sec-4-text" ref={sec4TextRef}>
    <h2>
      My <span className="litbit">Tech</span> Stack
    </h2>
    <p>
      My arsenal of code & creativity — the technologies I rely on to build,
      break, refine, and re-imagine the web.
    </p>
  </div>
  <svg className="snake-svg snake-diagonal" width="100%" height="1200px" viewBox="0 0 1200 1000" preserveAspectRatio="none">
  <path id="snakePath2"
    d="
      M 0 1200
      C 150 1000, 300 800, 400 600
      C 500 400, 700 200, 1200 0
    "
    stroke="#35185c"
    strokeWidth="36"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
  {/* Tech Grid */}
   <div className="tech-grid">
    {[
      { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Vite", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
      { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Linux", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ].map((tech) => (
      <div className="tech-card" key={tech.name}>
        <img src={tech.src} alt={tech.name} />
        <p>{tech.name}</p>
      </div>
    ))}
  </div>

</section>
{/* <section>
<HangingCardsSection images={[
  { src: "/events/1.png", label: "Event 1" },
  { src: "/events/2.png", label: "Event 2" },
  { src: "/events/3.png", label: "Event 3" },
]} />

</section> */}
<Footer />
    </>
  );
};

export default Home;
