import { useEffect, useRef, useState } from "react";

const LazySpline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Dispose viewer when hidden
  useEffect(() => {
    if (!show) {
      const viewer = document.querySelector("spline-viewer") as any;
      if (viewer && viewer.dispose) {
        viewer.dispose(); // stop rendering + free memory
      }
    }
  }, [show]);

  return (
    <div ref={containerRef} className="spline-clip" style={{ height: "100vh" }}>
      {show ? (
        <spline-viewer url="https://prod.spline.design/8F7t0OTSeBDPomj4/scene.splinecode"></spline-viewer>
      ) : (
        <div style={{ height: "100%", width: "100%", opacity: 0.2 }}>
          Loading 3D...
        </div>
      )}
    </div>
  );
};

export default LazySpline;