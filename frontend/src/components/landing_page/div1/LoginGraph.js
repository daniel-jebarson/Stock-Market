import "./style.css";

import React from "react";

import StonksMan from "../../../assets/stonks man.png";
import GraphImage from "../../../assets/graph-image.png";
import Navbar from "./Navbar";
import Graph from "react-graph-vis";
class LoginGraph extends React.Component {
  render() {
    let h = window.screen.availHeight;
    const mystyle = {
      height: h,
    };
    const graph = {
      nodes: [
        { id: 1, label: "IBM", title: "IBM" },
        { id: 2, label: "DAI", title: "DAI" },
        { id: 3, label: "TSCO", title: "TSCO" },
        { id: 4, label: "SHOP", title: "SHOP" },
        { id: 5, label: "GPV", title: "GPV" },
        { id: 6, label: "REL", title: "Reliance" },
        { id: 7, label: "STONKS", title: "STONKS" },
        { id: 8, label: "GAIN", title: "GAIN" },
        { id: 9, label: "No LOSS", title: "PROFIT" },
        { id: 10, label: "RISK", title: "RISK" },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 6 },
        { from: 2, to: 7 },
        { from: 3, to: 8 },
        { from: 3, to: 9 },
        { from: 3, to: 10 },
        { from: 4, to: 5 },
        { from: 4, to: 6 },
        { from: 4, to: 7 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 6, to: 10 },
      ],
    };

    const options = {
      layout: {
        hierarchical: false,
      },
      edges: {
        color: "#ee08cb",
      },
      nodes: {
        color: { background: "#f399ed", border: "#f50a35" },
        shape: "circle",
        scaling: { min: 20 },
      },

      height: "600px",
      width: "1000px",
    };

    const events = {
      select: function (event) {
        var { nodes, edges } = event;
        console.log(nodes[0]);
      },
    };
    // let w = window.screen.availWidth;
    // const history = useHistory();
    return (
      <div style={mystyle}>
        {" "}
        {!sessionStorage.getItem("username") ? <Navbar /> : ""}
        <div className=" image-fix">
          <img src={StonksMan} alt="Stonks Man" />
          {/* <img src={GraphImage} alt="Stonks Man" /> */}
          <Graph graph={graph} options={options} events={events} />
        </div>
      </div>
    );
  }
}

export default LoginGraph;
