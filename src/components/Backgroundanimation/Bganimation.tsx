"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./bganimation.css";
import { pre } from "framer-motion/client";

const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 });
  const pwrapRef = useRef<any>(null);
  const [dimension, setDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (
      pwrapRef.current.offsetWidth != null &&
      pwrapRef.current.offsetHeight != null
    ) {
      setDimension({
        width: pwrapRef.current.offsetWidth,
        height: pwrapRef.current.offsetHeight,
      });
    }
  }, [pwrapRef]);

  return (
    <div className="particles-wrapper" ref={pwrapRef}>
      {dimension.width != 0 && dimension.height != 0
        ? particles.map((element, index) => (
            <motion.div
              key={index}
              className="particle"
              initial={{
                x: Math.random() * dimension.width,
                y: Math.random() * dimension.height,
              }}
              animate={{
                x: Math.random() * dimension.width,
                y: Math.random() * dimension.height,
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))
        : null}
    </div>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="progress-bar" style={{ scaleX }} />;
};

const CombinedComponent: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <ParticleBackground />
    </>
  );
};

export default CombinedComponent;
