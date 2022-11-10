import { Component } from "react";
import GraphMaker from "../GraphMaker/GraphMaker";
class Card extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "95px",
          padding: "65px 10px",
        }}
      >
        <div
          style={{
            fontSize: "52px",
            fontWeight: "bolder",
            wordWrap: "normal",
            width: "100px",
            color: "#e18e35",
            writingMode: "vertical-rl",
            transform: "rotate(-180deg)",
          }}
        >
          {this.props.product.replace(".", " ")}
        </div>
        <GraphMaker product={this.props.product} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <button
            onClick={(event) => (window.location.href = "/mainPage")}
            className="green"
          >
            Buy
          </button>
          <button
            onClick={(event) => (window.location.href = "/mainPage")}
            className="red"
          >
            Sell
          </button>
        </div>
      </div>
    );
  }
}

export default Card;
