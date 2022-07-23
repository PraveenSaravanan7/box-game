import React, { useEffect, useState } from "react";
import { Box } from "./components/Box";
import { Controls } from "./components/Controls";
import { Game } from "./libs";

export const MyGame = new Game();

export const App = () => {
  const [boxes, setBoxes] = useState<JSX.Element[]>([]);

  const addBox = () =>
    setBoxes((prev) => [...prev, <Box boxIndex={prev.length} />]);

  useEffect(() => {
    MyGame.onDeleteBox = (index: number) =>
      setBoxes((prev) => {
        const copyData = [...prev];
        copyData[index] = <></>;
        return copyData;
      });
  }, []);

  return (
    <>
      <Controls addBox={addBox} />
      {boxes}
    </>
  );
};
