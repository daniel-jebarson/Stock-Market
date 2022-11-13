import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function ConfettiSet() {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width - 20}
      height={height}
      className="opacity-100"
      numberOfPieces={500}
      //   onConfettiComplete={() => this.setState({ confetti: false })}
      colors={[
        "#03045e",
        "#023e8a",
        "#0077b6",
        "#0096c7",
        "#00b4d8",
        "#48cae4",
        "#90e0ef",
        "#ade8f4",
        "#caf0f8",
      ]}
      recycle={true}
    />
  );
}
