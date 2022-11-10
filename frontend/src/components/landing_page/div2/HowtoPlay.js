import React from "react";
import "./howtoplaystyle.css";

class HowtoPlay extends React.Component {
  render() {
    let h = window.screen.availHeight;
    let w = window.screen.availWidth;
    const mystyle = {
      minHeight: h - 150,
      maxWidth: w,
    };
    return (
      <div className="bodys">
        <div className="cards-list" style={mystyle}>
          <center>
            <h1 className="howtoplay">How to Play</h1>
          </center>
          <div
            className="card"
            onClick={() => {
              console.log(sessionStorage.getItem("username"));
              if (
                sessionStorage.getItem("username") === null ||
                sessionStorage.getItem("username") === ""
              )
                window.location.href = "./registration";
              else {
                window.location.href = "./profile";
              }
            }}
          >
            <div className="card_title title-white">
              <p>
                This is a Stock Market Game. This Game Replicates the actual
                stock market. To start this game first you have to signup if you
                are a new player else login back into your account. You will be
                provided with some stonkcoins when you start the game. The
                objective is to gain maximum profit using these stonkcoins by
                buying and selling stocks from different companies. There are a
                total of 6 different companies whose stock values goes up and
                down depending on the market value. The best strategy to win is
                to buy stocks when they are very cheap and sell them when their
                value is very high.
              </p>
              <h3 style={{ marginTop: "70px", textAlign: "center" }}>
                 Good Luck
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowtoPlay;
