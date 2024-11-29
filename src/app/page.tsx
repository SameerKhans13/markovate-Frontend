"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import "./page.css";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BGAnimation from "../components/Backgroundanimation/Bganimation";

/* const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="progress-bar" style={{ scaleX }} />;
}; */

function LoaderAnimation() {
  const letters = "MARKOVATE".split("");

  return (
    <>
      <motion.div className="loader" exit={{ opacity: 0 }}>
        <div className="letters-container">
          {letters.map((letter, index) => {
            const isO = letter === "O";
            return (
              <motion.span
                key={index}
                className={`loader-letter ${isO ? "letter-o" : ""}`}
                animate={{
                  rotateX: isO ? [0, 360] : 0,
                  scale: isO ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

const AnimatedText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.01 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <motion.div
        className={`text-wrapper ${className}`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className="animated-letter">
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </>
  );
};

const FeatureCard = ({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <motion.div
        ref={ref}
        className="feature-card"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <motion.div
          className="feature-card-overlay"
          whileHover={{
            opacity: [0, 1],
            transition: { duration: 0.3 },
          }}
        />
      </motion.div>
    </>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <>
      <motion.div className="hero-section" style={{ y }}>
        <AnimatedText text="Welcome to Markovate" className="hero-title" />

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          AI-Powered Exams: Smart Grading for Every Question
        </motion.p>
      </motion.div>
    </>
  );
};

const AnimatedLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 3000);

    // Cleanup function to clear the timer if component unmounts
    return () => clearTimeout(loadingTimer);
  }, []);

  const features = [
    {
      title: "AI-Powered Grading",
      description:
        "Intelligent evaluation system for accurate and fast results",
    },
    {
      title: "Custom Exams",
      description: "Create and customize tests to match your requirements",
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive insights and performance tracking",
    },
  ];

  return (
    <>
      <ParallaxProvider>
        <div className="app-container">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div className="loader" exit={{ opacity: 0 }} key="loader">
                <AnimatedText text="MARK" className="loading-text-1" />
                <motion.div
                  className="loader-circle"
                  animate={{
                    scale: [1, 2, 1],
                    rotate: [0, 360],
                    borderRadius: ["20%", "50%", "20%"],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: 2,
                  }}
                />
                <AnimatedText text="VATE" className="loading-text-2" />
              </motion.div>
            ) : (
              <>
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BGAnimation />
                  <Header />

                  <main ref={mainRef} className="main-content">
                    <Parallax speed={-20}>
                      <HeroSection />
                    </Parallax>

                    <section className="features-section">
                      <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        Our Features
                      </motion.h2>

                      <div className="features-grid">
                        {features.map((feature, index) => (
                          <FeatureCard key={index} {...feature} index={index} />
                        ))}
                      </div>
                    </section>

                    <section className="about-section">
                      <Parallax speed={10}>
                        <motion.div
                          className="about-content"
                          initial={{ opacity: 0, x: -100 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7 }}
                        >
                          <h2>About Markovate</h2>
                          <p>
                            Markovate is an AI-powered exam portal supporting
                            subjective and objective questions. Teachers can
                            create and customize exams, while students submit
                            answers in typed or handwritten formats.
                          </p>
                        </motion.div>
                      </Parallax>
                    </section>

                    <section className="cta-section">
                      <motion.div
                        className="cta-container"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.a
                          href="/services"
                          className="cta-button primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                        </motion.a>
                        <motion.a
                          href="/auth"
                          className="cta-button secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Get Started
                        </motion.a>
                      </motion.div>
                    </section>
                  </main>

                  <Footer />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </ParallaxProvider>
    </>
  );
};

export default AnimatedLanding;
