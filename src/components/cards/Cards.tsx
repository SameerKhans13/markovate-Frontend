import React from "react";

import "./style.css";

interface SponserCardProps {
  title: string;
  image: string;
}

const SponserCard: React.FC<SponserCardProps> = ({ title, image }) => {
  return (
    <>
      <div className="sponser-card">
        {/* <img src={image} alt="#" draggable={false} /> */}
        <p className="sponser-title">{title}</p>
      </div>
    </>
  );
};

export default SponserCard;