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

  const updateBox = () => {
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
    if (!isActive) updateBox();
  };

  useEffect(updateBox, []);

  return (
    <div
      className={`${styles.box} ${activeStyle}`}
      ref={boxRef}
      onClick={onSeletion}
    ></div>
  );
};
