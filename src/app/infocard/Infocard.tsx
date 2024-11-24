import React, { useEffect, useState } from "react";
import Layout from "../../app/layout";
import "./style.css";
import SponserCard from "../../components/cards/Cards";
import sponserList from "../../../src/data/infocard.json";

interface Sponsor {
  txt: string;
  img: string;
}

const Sponser: React.FC = () => {
  const [shuffledlist, setShuffledlist] = useState<Sponsor[]>(sponserList);

  useEffect(() => {
    document.title = "Sponsers";
  }, []);

  useEffect(() => {
    setShuffledlist(shuffle(sponserList));
  }, []);

  const shuffle = (array: Sponsor[]): Sponsor[] => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  return (
    <>
      <Layout>
        <section className="section-sponser">
        </section>
        <section className="sponsers-list">
          < h1 title={"Our Sponsors"} />
          <div className="fog f-left"></div>
          <div className="fog f-right"></div>
          <div className="list">
            <div className="sponser-void"></div>
            {shuffledlist.map(({ txt, img }) => (
              <SponserCard key={txt} title={txt} image={img} />
            ))}
            <div className="sponser-void"></div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Sponser;

