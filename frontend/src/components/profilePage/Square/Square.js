import React from "react";
import "./Square.css";
function Square(props) {
  return (
    <div
      className="square"
      onClick={(event) => (window.location.href = "/dashboard")}
    >
      <center>
        <a href="#">
          <div
            style={{
              display: "flex",
              marginTop: "25px",
              flexDirection: "column",
              padding: "4px",
            }}
          >
            <h3>{props.title}</h3>
            <h2 style={{ fontSize: "72px", fontWeight: "lighter" }}>
              {props.stocks}
            </h2>
          </div>
        </a>
      </center>
    </div>
  );
}

export default Square;
