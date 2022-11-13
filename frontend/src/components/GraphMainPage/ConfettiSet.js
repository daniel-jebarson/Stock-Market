import React from "react";
import { useWindowSize, useMouse } from "react-use";
import Confetti from "react-confetti";

export default function ConfettiSet() {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      style={{ position: "fixed", top: "0px" }}
      width={width - 20}
      height={height}
      className="opacity-100"
      numberOfPieces={500}
      recycle={false}
    />
  );
}
