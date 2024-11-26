"use client";

import React, { useEffect, useState } from "react";
import "./style.css";
import PartnerCard from "../../components/Partner/Partnercard";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BGAnimation from "../../components/Backgroundanimation/Bganimation"; // Importing BGAnimation
// Import sponsor data
import partnerList from "../../data/infocard.json";

// Define the structure of each sponsor
interface Sponsor {
  txt: string;
  img: string;
}

// Main partner Component
const partner: React.FC = () => {
  // State to hold the shuffled list of sponsors
  const [shuffledList, setShuffledList] = useState<Sponsor[]>([]);

  // Shuffle function to randomize sponsor order
  const shuffle = (array: Sponsor[]): Sponsor[] => {
    return array
      .map((item) => ({ sort: Math.random(), value: item }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.value);
  };

  useEffect(() => {
    // Set page title
    document.title = "Sponsors";
    // Shuffle sponsor list on component mount
    setShuffledList(shuffle(partnerList));
  }, []);

  return (
    <>
      {/* Background Animation */}
      <BGAnimation />

      {/* Adding Header */}
      <Header />

      <h1 className={"Sponsors-title"}>Our Partner</h1>
      <section className="section-partner">
        <div className="intro">
          <div title={"Sponsors"}>
            <p>
              We are deeply grateful for the generous support of our partner.
              Their commitment and contributions empower us to achieve our
              mission and make a meaningful impact.
            </p>
          </div>
        </div>
      </section>
      <section className="partners-list">
        <div title={"Our Sponsors"} />
        <div className="fog f-left"></div>
        <div className="fog f-right"></div>
        <div className="list">
          <div className="partner-void"></div>
          {shuffledList.map(({ txt, img }) => (
            <PartnerCard key={txt} title={txt} image={img} />
          ))}
          <div className="partner-void"></div>
        </div>
      </section>

      {/* Adding Footer */}
      <Footer />
    </>
  );
};

export default partner;
