import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { MyGame } from "../App";

import styles from "./Box.module.css";

export interface BoxElement {
  element: HTMLDivElement;
  deactivate: () => void;
  index: number;
}

export const Box = ({ boxIndex }: { boxIndex: number }) => {
  const [isActive, setIsActive] = useState(true);

  const boxRef = useRef<HTMLDivElement>(null);

  const activeStyle = isActive ? styles.active : "";

  const updateBoxInGame = useCallback(() => {
    if (boxRef.current) {
      setIsActive(true);

      MyGame.updateBox({
        element: boxRef.current,
        deactivate() {
          setIsActive(false);
        },
        index: boxIndex,
      });
    }
  }, [boxIndex]);

  const onSeletion = () => {
    if (!isActive) updateBoxInGame();
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.left = Math.floor(Math.random() * 500) + "px";
      boxRef.current.style.top = Math.floor(Math.random() * 500) + "px";
    }

    updateBoxInGame();
  }, [updateBoxInGame]);

  return (
    <div
      className={`${styles.box} ${activeStyle}`}
      ref={boxRef}
      onClick={onSeletion}
    ></div>
  );
};
