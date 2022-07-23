import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { MyGame } from "../App";

import styles from "./Box.module.css";

export interface BoxElement {
  element: HTMLDivElement;
  deactivate: () => void;
}

export const Box = () => {
  const [isActive, setIsActive] = useState(true);

  const boxRef = useRef<HTMLDivElement>(null);

  const activeStyle = isActive ? styles.active : "";

  const updateBoxInGame = () => {
    if (boxRef.current) {
      setIsActive(true);

      MyGame.updateBox({
        element: boxRef.current,
        deactivate() {
          setIsActive(false);
        },
      });
    }
  };

  const onSeletion = () => {
    if (!isActive) updateBoxInGame();
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.left = Math.floor(Math.random() * 500) + "px";
      boxRef.current.style.top = Math.floor(Math.random() * 500) + "px";
    }

    updateBoxInGame();
  }, []);

  return (
    <div
      className={`${styles.box} ${activeStyle}`}
      ref={boxRef}
      onClick={onSeletion}
    ></div>
  );
};
