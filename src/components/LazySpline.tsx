import { useEffect, useState, useRef } from "react";

const LazySpline = () => {
  const [load, setLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load slightly before entering
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Proper destruction
  useEffect(() => {
    return () => {
      const viewer = document.querySelector("spline-viewer") as any;
      if (viewer && viewer.dispose) viewer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="spline-clip">
      {load ? (
        <spline-viewer url="https://prod.spline.design/4CXSQkS8qxPpKaFp/scene.splinecode"></spline-viewer>
      ) : (
        <div style={{ height: "100vh", width: "100%", opacity: 0.3 }}>
          Loading 3D...
        </div>
      )}
    </div>
  );
};

export default LazySpline;
