import React, { useState } from "react";
import { Box } from "./components/Box";
import { Controls } from "./components/Controls";
import { Game } from "./libs";

export const MyGame = new Game();

export const App = () => {
  const [boxes, setBoxes] = useState<JSX.Element[]>([]);

  const addBox = () => setBoxes((prev) => [...prev, <Box />]);

  return (
    <>
      <Controls addBox={addBox} />
      {boxes}
    </>
  );
};
