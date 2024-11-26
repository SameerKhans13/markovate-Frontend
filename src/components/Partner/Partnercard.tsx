import React from "react";
import "./Partnercard.css";

// Define the props interface
interface partnerCardProps {
  title: string;
  image: string;
}

const PartnerCard: React.FC<partnerCardProps> = ({ title, image }) => {
  return (
    <div className="partner-card">
      {/* <img src={image} alt={title} draggable={false} /> */}
      <p className="partner-title">{title}</p>
    </div>
  );
};

export default PartnerCard;
