"use client";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./page.css";

export default function Home() {
  return (
    <>
      <div className="page">
        <Header />
        {/* Background GIF */}
        <div className="backgroundGif">
          <img src="/bg.gif" alt="Background Animation" />
        </div>

        {/* Main Content */}
        <main className="main">
          <div className="content">
            <h1 className="title zoomIn">
              Welcome to <span className="highlight">Markovate</span>
            </h1>
            <p className="tagline fadeIn">
              AI-Powered Exams: Smart Grading for Every Question.
            </p>
            <section className="description slideIn">
              <h2>About Markovate</h2>
              <p>
                Markovate is an AI-powered exam portal supporting subjective and
                objective questions. Teachers can create and customize exams,
                while students submit answers in typed or handwritten formats.
                Our intelligent backend AI grades responses, provides feedback,
                and generates analytics, making evaluations faster, unbiased,
                and insightful.
              </p>
            </section>
          </div>
        </main>

        <div className="ctas">
          <a href="/learn-more ">Learn More</a>
          <a href="/get-startedy">Get Started</a>
        </div>

        <Footer />
      </div>
    </>
  );
}
