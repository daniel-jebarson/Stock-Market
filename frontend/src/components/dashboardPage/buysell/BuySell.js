import "./style.css";

import { Component } from "react";
import GraphMaker from "../GraphMaker/GraphMaker";
import Card from "../card/Card";
class BuySell extends Component {
  render() {
    const comp = [
      "IBM",
      "TSCO.LON",
      "DAI.DEX",
      "SHOP.TRT",
      "GPV.TRV",
      "RELIANCE.BSE",
    ];
    return comp.map((val) => {
      return <Card product={val} />;
    });
  }
}

export default BuySell;
