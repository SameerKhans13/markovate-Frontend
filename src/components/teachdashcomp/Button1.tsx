import React from "react";
import "./Button1.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`button ${className || ""}`}>
      {children}
    </button>
  );
};
