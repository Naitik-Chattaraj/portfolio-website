import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myImage from "../assets/my-image.png";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    // Image scroll animation
    gsap.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%", // controls when the animation finishes
          scrub: true,    // makes animation follow scroll
        },
      }
    );

    // Text scroll animation
    gsap.fromTo(
      textRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
    // Chat bubble animation
if (chatRef.current) {
  gsap.fromTo(
    chatRef.current,
    { x: -20, opacity: 0, scale: 0.8 },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: 0.5, // after image comes in
      ease: "back.out(1.7)"
    }
  );
}

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="spline-clip">
          <spline-viewer url="https://prod.spline.design/4CXSQkS8qxPpKaFp/scene.splinecode"></spline-viewer>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={sectionRef}
        className="about-section"
      >
        <div ref={imageRef} className="about-image">
          <img src={myImage} alt="Me" />
          <div ref={chatRef} className="chat-bubble">Hello World</div>
        </div>
        <div ref={textRef} className="about-text">
          <h2>A Little bit About Me!</h2>
          <p>
            I’m a passionate web developer with a love for creating interactive
            and visually stunning websites. I enjoy learning new tech,
            experimenting with UI/UX design, and building projects that challenge
            me.
          </p>
          <div className="liquidGlass-btn">
          <span className="btn-text">Know More</span>
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Home;
