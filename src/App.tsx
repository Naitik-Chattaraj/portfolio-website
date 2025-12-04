import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Layouts (Optional)
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <svg width={0} height={0} style={{ position: "absolute" }}>
  <defs>
    <filter
      id="nav-glass"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
    >
      {/* Horizontal refraction bias */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.002 0.05"
        numOctaves="3"
        seed="7"
        result="warpNoise"
      />

      {/* Stretch distortion stronger in middle, weaker edges */}
      <feComponentTransfer in="warpNoise" result="centerWarp">
        <feFuncR type="gamma" exponent="2.4" amplitude="1" offset="0" />
        <feFuncG type="gamma" exponent="1.8" amplitude="1" offset="0" />
        <feFuncB type="gamma" exponent="2.4" amplitude="1" offset="0" />
      </feComponentTransfer>

      {/* Refraction */}
      <feDisplacementMap
        in="SourceGraphic"
        in2="centerWarp"
        scale="30"
        xChannelSelector="R"
        yChannelSelector="G"
        result="refracted"
      />

      {/* Frosted blur */}
      <feGaussianBlur in="refracted" stdDeviation="10" result="frost" />

      {/* Slight brightness lift like real glass */}
      <feColorMatrix
        in="frost"
        type="matrix"
        values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 .28 0
        "
        result="glass"
      />

      {/* Edge highlight */}
      <feSpecularLighting
        in="centerWarp"
        specularConstant="1.3"
        specularExponent="70"
        surfaceScale="4"
        lightingColor="#ffffff"
        result="shine"
      >
        <fePointLight x="0" y="-200" z="150" />
      </feSpecularLighting>

      {/* Add rim glow */}
      <feBlend in="glass" in2="shine" mode="screen" />
    </filter>
  </defs>
</svg>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
