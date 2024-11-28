import React from "react";
import "./Button2.css";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className} ${disabled ? "button-disabled" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
