import axios from "axios";
import React from "react";
import { Component } from "react";

class admin extends Component {
  state = {
    total_purchases: 0,
    products: [],
    userData: {},
    profileData: {},
  };

  componentDidMount() {
    this.getUserData();
    this.getDetails();
    this.getTotal();
  }

  getTotal = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getTotal`)
      .then((response) => {
        const { data } = response;
        this.setState({ total_purchases: data[0].total });
      });
  };

  getDetails = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getUsers`)
      .then((response) => {
        const data = response.data;
        const d = {};
        data.map((value, index) => {
          d[value.username] = value;
          //   this.setState({ ban: [...this.state.ban, value.ban] });
          //   this.setState({ email: [...this.state.email, value.email] });
        });
        console.log(d);
        this.setState({ profileData: d });
      })
      .catch(() => {
        alert("Error in data retrival!!!!");
      });
  };

  getUserData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getData`)
      .then((response) => {
        const data = response.data;

        // console.log(data);

        this.setState({ products: data });
      })

      .catch(() => {
        alert("Error in data retrival!!!!");
      });
  };

  banSetter = async (username, status) => {
    await axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/ban/${username}`, {
        ban: status,
      })
      .then((res) => {
        let data = this.state.profileData;
        data[username]["ban"] = status;
        this.setState({ profileData: data });
        // this.state.profileData[product["username"]]["ban"];
        console.log(res.data);
      });
    // console.log(username + "=>" + status);
  };

  displayUserData = () => {
    // if (!this.state.products.length) return console.log("ERRRRRROR");
    if (!this.state.products.length || !this.state.profileData)
      return "Loading...";

    return this.state.products.map((product, index) => {
      return product["username"] != "admin" ? (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            borderRadius: "10px",
            border: "solid #7928ca",
            boxShadow: "0 0 10px #7928ca",
            margin: "30px 10px 15px 10px",
            padding: "60px 100px",
          }}
        >
          {this.state.profileData[product["username"]] ? (
            <div>
              <h3>UserName: {product["username"]} </h3>
              <h3>
                Email:{" "}
                {this.state.profileData[product["username"]]
                  ? this.state.profileData[product["username"]]["email"]
                  : "You are sus!"}{" "}
              </h3>
              <h3>StartDate: {product["start"]}</h3>
              <h3>Coins: {product["coins"]}</h3>
              <h3>Profit: {product["profit"]}</h3>
              <h3>No of Purchases:{product["total"]}</h3>
              <h3>
                Ban:
                {this.state.profileData[product["username"]]
                  ? this.state.profileData[product["username"]]["ban"]
                    ? "True"
                    : "False"
                  : "You are sus...!"}
              </h3>
              <input
                type={"checkbox"}
                name="ban"
                onChange={(e) => {
                  this.banSetter(product["username"], e.target.checked);
                }}
                defaultChecked={
                  this.state.profileData[product["username"]]["ban"]
                }
              />
              Ban
            </div>
          ) : (
            "You are sus...!"
          )}

          <div>
            <table
              style={{
                textAlign: "center",
                borderCollapse: "separate",
                border: "2px solid #108ccf",
                width: "500px",
              }}
              cellPadding="7px"
              cellSpacing={"5px"}
            >
              <tr>
                <th>Companies</th>
                <th>Stocks</th>
                <th>Times</th>
                <th>CP</th>
              </tr>
              <tr>
                <td>IBM</td>
                <td>{product["IBM"]["stocks"]}</td>
                <td>{product["IBM"]["times"]}</td>
                <td>{product["IBM"]["cp"]}</td>
              </tr>
              <tr>
                <td>TSCO</td>
                <td>{product["TSCO"]["stocks"]}</td>
                <td>{product["TSCO"]["times"]}</td>
                <td>{product["TSCO"]["cp"]}</td>
              </tr>
              <tr>
                <td>DAI</td>
                <td>{product["DAI"]["stocks"]}</td>
                <td>{product["DAI"]["times"]}</td>
                <td>{product["DAI"]["cp"]}</td>
              </tr>
              <tr>
                <td>SHOP</td>
                <td>{product["SHOP"]["stocks"]}</td>
                <td>{product["SHOP"]["times"]}</td>
                <td>{product["SHOP"]["cp"]}</td>
              </tr>
              <tr>
                <td>GPV</td>
                <td>{product["GPV"]["stocks"]}</td>
                <td>{product["GPV"]["times"]}</td>
                <td>{product["GPV"]["cp"]}</td>
              </tr>
              <tr>
                <td>RELIANCE</td>
                <td>{product["RELIANCE"]["stocks"]}</td>
                <td>{product["RELIANCE"]["times"]}</td>
                <td>{product["RELIANCE"]["cp"]}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        ""
      );
    });
  };

  render() {
    return (
      <div
        style={{
          background: "black",
          display: "flex",
          flexDirection: "column",
          color: "black",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => {
            window.location.href = "./profile";
          }}
          style={{
            cursor: "pointer",
            alignItems: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "#1c1c1c",
              padding: "15px 100px",
              borderRadius: "10px",
              margin: "10px",
              color: "white",
              textAlign: "center",

              border: "solid #7928ca",
              boxShadow: "0 0 10px #7928ca",
            }}
          >
            <h1>Number of Users</h1>
            <br />

            <h2>{this.state.products.length}</h2>
          </div>

          <div
            style={{
              background: "#1c1c1c",
              padding: "15px 100px",
              borderRadius: "10px",
              margin: "10px",
              color: "white",
              textAlign: "center",

              border: "solid #7928ca",
              boxShadow: "0 0 10px #7928ca",
            }}
          >
            <h1>Number of Purchase</h1>
            <br />

            <h2>{this.state.total_purchases}</h2>
          </div>

          <div
            style={{
              background: "#1c1c1c",
              padding: "15px 100px",
              borderRadius: "10px",
              margin: "10px",
              color: "white",
              textAlign: "center",

              border: "solid #7928ca",
              boxShadow: "0 0 10px #7928ca",
            }}
          >
            <h1>Number of Companies</h1>
            <br />

            <h2>6</h2>
          </div>
        </div>

        <div
          style={{
            background: "black",
            padding: "10px 14px",
            color: "white",
            width: "100%",
          }}
        >
          <this.displayUserData />
        </div>
      </div>
    );
  }
}

export default admin;
