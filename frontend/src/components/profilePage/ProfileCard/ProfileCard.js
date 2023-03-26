import React from "react";
import "./ProfileCard.css";
import pic from "../../../assets/blue-transparent.png";
import Square from "../Square/Square";
import point from "../../../assets/point.png";
import { useState, useEffect } from "react";
import Axios from "axios";

function ProfileCard() {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  const logOuter = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    setLoading(true);
    const username = sessionStorage.getItem("username");

    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/getData`).then(
      (response) => {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i]["username"] === username) {
            setProfileData(response.data[i]);
            setLoading(false);
          }
        }
      }
    );
  }, []);

  if (loading) {
    return "Loading....";
  } else {
    return (
      <section className="profcard">
        <center>
          <div className="rect">
            <div className="circle">
              <img src={pic} alt="profilePic"></img>
            </div>
            <div className="circle">
              <div className="parent">
                <center>
                  <h2 className="user"> {profileData.username}</h2>
                  {/* <h2>{profileData.username}</h2> */}
                </center>
                <div className="points-container">
                  <h3 className="points-num">
                    {parseFloat(profileData.coins).toFixed(2)}
                  </h3>
                  <img className="coin" src={point} alt="Coin" />
                </div>

                <h4 className="play-from" style={{ color: "black" }}>
                  Since {/* <span className="date">16th August 2022</span> */}
                  <span style={{ padding: "15px 2px" }} className="date">
                    {profileData.start}
                  </span>
                </h4>
              </div>
            </div>

            <div className="square-parent">
              <div className="square-container">
                <Square
                  stocks={profileData["IBM"]["stocks"]}
                  title={"IBM   "}
                />
                <Square
                  stocks={profileData["TSCO"]["stocks"]}
                  title={"TSCO   "}
                />
                <Square
                  stocks={profileData["DAI"]["stocks"]}
                  title={"DAI   "}
                />
                <Square
                  stocks={profileData["SHOP"]["stocks"]}
                  title={"SHOP   "}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <button
                onClick={() => {
                  logOuter();
                }}
                className="logout"
              >
                Logout{" "}
              </button>
              {sessionStorage.getItem("username") === "admin" ? (
                <button
                  onClick={() => {
                    window.location.href = "./admin";
                  }}
                  className="admin"
                >
                  Admin
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </center>
      </section>
    );
  }
}

export default ProfileCard;
