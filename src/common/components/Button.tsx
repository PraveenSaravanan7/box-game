import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button className="button-19" onClick={onClick}>
      {children}
    </button>
  );
};
