import React from "react";
import { useState } from "react";
import { MyGame } from "../App";
import { Button } from "../common/components/Button";
import styles from "./Controls.module.css";

interface ControlsProps {
  addBox: () => void;
}

export const Controls = ({ addBox }: ControlsProps) => {
  const [control, setControl] = useState(true);

  const toggleKeyBoard = () => {
    MyGame.toggleKeyboardControl();
    setControl(() => MyGame.getControlState());
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={addBox}>+ Add Box</Button>

      <Button onClick={toggleKeyBoard}>
        Keyboard: {control ? "ON" : "OFF"}
      </Button>
    </div>
  );
};
