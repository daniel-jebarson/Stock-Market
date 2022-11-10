import "./Graphstyle.css";
import pic from "../../assets/stonksManProfile.jpg";
import React from "react";
import Axios from "axios";
import { Component } from "react";
import GraphMaker from "./GraphMakerMainPage";
import point from "../../assets/point.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class BuySellMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "IBM",
      number: 0,
      userData: {},
      todayPrice: 0,
      productPrice: 0,
      buyGain: 0,
      sellGain: 0,
    };
  }

  componentDidMount() {
    this.setTodayPrice(this.state.product);
    this.setUserProductData(this.state.product);
    this.setProfit();
  }

  updateData = (product) => {
    this.setState({ product: product });
    console.log(this.state.product);
    this.setTodayPrice(product);
    this.setUserProductData(product.split(".")[0]);
    this.setProfit();
  };

  setProfit = () => {
    this.setState({
      buyGain: this.state.todayPrice - this.state.productPrice,
      sellGain: this.state.productPrice - this.state.todayPrice,
    });
  };

  convertToTwoDigit = (x) => {
    return parseFloat(x).toFixed(2);
  };

  setUserProductData = async (product) => {
    const username = sessionStorage.getItem("username");

    await Axios.get("http://localhost:3002/getData").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i]["username"] === username) {
          this.setState({
            userData: response.data[i],
            productPrice: response.data[i][product.split(".")[0]]["cp"],
          });
          // console.log(this.state.userData);
        }
      }
    });
  };

  setTodayPrice = async (product) => {
    const API_REQ = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${product}&outputsize=full&apikey=demo`;
    await fetch(API_REQ)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let lastValue =
          data["Time Series (Daily)"][
            Object.keys(data["Time Series (Daily)"])[0]
          ][["1. open"]];
        this.setState({ todayPrice: lastValue });
      });
  };

  putData = async (data) => {
    const username = sessionStorage.getItem("username");
    await Axios.put(`http://localhost:3002/update/${username}`, data).then(
      (response) => {
        console.log(response.data);
        // this.updateData()
      }
    );
  };

  buyItem = async () => {
    if (this.state.number <= 0) {
      // alert("Please specify the proper stock value");
      // console.log("error");
      toast.warn("Please specify the proper stock value", {
        position: "bottom-right",
        autoClose: 5002,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      this.nameInput.focus();
      return;
    } else if (this.state.number == undefined || this.state.number == "") {
      // alert("Please specify the number of tasks");
      toast.warn("Please specify the number of stocks", {
        position: "bottom-right",
        autoClose: 5002,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      this.nameInput.focus();
      return;
    }
    if (this.state.userData.coins < this.state.number * this.state.todayPrice) {
      // alert(
      //   `You need more ${
      //     this.state.number * this.state.todayPrice - this.state.userData.coins
      //   } to buy this stocks`
      // );
      toast.error(
        `You need more ${
          this.state.number * this.state.todayPrice - this.state.userData.coins
        } to buy this much ${this.state.product} stocks`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    } else {
      // this.setState({ product: this.state.product.split(".")[0] });
      let stocks = parseFloat(
        this.state.userData[this.state.product.split(".")[0]]["stocks"]
      );
      let times =
        this.state.userData[this.state.product.split(".")[0]]["times"];
      let cp = this.state.productPrice;
      let buyPrice = this.state.number * this.state.todayPrice;
      const coins = this.state.userData.coins - buyPrice;
      cp = (cp * stocks + buyPrice) / (stocks + this.state.number);

      times += 1;
      stocks += parseFloat(this.state.number);
      // alert("Stocks bought successfully!");
      toast.success("Stocks bought successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(
        `${this.state.number} ${this.state.product} stocks bought for ${buyPrice}. Coins have ${coins}. Avg = ${cp}, times= ${times}. Number of ${this.state.product} stocks= ${stocks}`
      );

      let userData = this.state.userData;
      userData.coins = coins;
      userData[this.state.product.split(".")[0]].stocks = stocks;
      userData[this.state.product.split(".")[0]].times = times;
      userData[this.state.product.split(".")[0]].cp =
        this.convertToTwoDigit(cp);
      userData["total"] = userData["total"] + 1;
      this.setState({ userData: userData });
      console.log(userData);
      this.putData(userData);
    }
    console.log("Bought item successfully!");
  };
  sellItem = async () => {
    if (this.state.number <= 0) {
      // alert("Please specify the proper stock value");
      toast.warn("Please specify the proper stock value", {
        position: "bottom-right",
        autoClose: 5002,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      this.nameInput.focus();
      return;
    } else if (this.state.number == undefined || this.state.number == "") {
      // alert("Please specify the number of tasks");
      toast.warn("Please specify the number of stocks", {
        position: "bottom-right",
        autoClose: 5002,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      this.nameInput.focus();
      return;
    }
    let stocks =
      this.state.userData[this.state.product.split(".")[0]]["stocks"];
    if (this.state.number > stocks) {
      // alert(
      //   `You don't have ${this.state.number} ${this.state.product} stocks. You only have ${stocks}`
      // );
      toast.error(
        `You need more ${this.state.number - stocks} ${
          this.state.product
        } stocks`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      this.nameInput.focus();
      return;
    } else {
      let stocks =
        this.state.userData[this.state.product.split(".")[0]]["stocks"];
      let times =
        this.state.userData[this.state.product.split(".")[0]]["times"];
      let cp = this.state.productPrice;
      let sellPrice = this.state.number * this.state.todayPrice;
      const coins = this.state.userData.coins + sellPrice;
      const profit =
        this.state.userData.profit + sellPrice - this.state.number * cp;
      // cp = (cp * stocks - sellPrice) / (stocks - this.state.number);
      // times += 1;
      stocks -= this.state.number;
      // alert("Stocks sold successfully!");
      toast.success(`+${sellPrice} 🪙`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(
        `${this.state.number} ${this.state.product} stocks sold for ${sellPrice}. Coins have ${coins}. Avg = ${cp}, times= ${times}. Number of ${this.state.product} stocks= ${stocks}`
      );
      let userData = new Object(this.state.userData);
      userData.coins = coins;
      userData[this.state.product.split(".")[0]].stocks = stocks;
      //  userData[this.state.product].times = times;
      userData[this.state.product.split(".")[0]].cp = cp;
      userData.profit = profit;
      this.setState({ userData: userData });
      this.putData(userData);
    }
    console.log("Sold item successfully!");
  };

  render() {
    return (
      <>
        <div style={{ marginTop: "55px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1
              onClick={() => {
                window.location.href = "./profile";
              }}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              {this.state.product}
            </h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "55px",
                justifyContent: "center",
              }}
            >
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
                  <th>Coins</th>
                  <td>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {parseFloat(this.state.userData.coins).toFixed(2)}
                      <img
                        className="coin"
                        style={{
                          height: "20px",
                          width: "20px",
                          marginLeft: "5px",
                        }}
                        src={point}
                        alt="Coin"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Purchases</th>
                  <td>
                    {this.state.userData != {} &&
                    this.state.userData[this.state.product.split(".")[0]] !=
                      undefined
                      ? this.state.userData[this.state.product.split(".")[0]][
                          "times"
                        ]
                      : "loading..."}
                    {/* {this.state.product} */}
                  </td>
                </tr>
                <tr>
                  <th>Stocks</th>
                  <td>
                    {this.state.userData != {} &&
                    this.state.userData[this.state.product.split(".")[0]] !=
                      undefined
                      ? this.state.userData[this.state.product.split(".")[0]][
                          "stocks"
                        ]
                      : "loading..."}
                  </td>
                </tr>
                <tr>
                  <th>Profit</th>
                  <td>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {parseFloat(this.state.userData["profit"]).toFixed(2)}
                      <img
                        className="coin"
                        style={{
                          marginLeft: "5px",
                          height: "20px",
                          width: "20px",
                        }}
                        src={point}
                        alt="Coin"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Cost</th>
                  <td>{this.state.todayPrice}</td>
                </tr>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "75px",
            }}
          >
            <div style={{ height: "334px" }}>
              <nav>
                <label for="touch">
                  <span className="comp">Companies</span>
                </label>
                <input type="checkbox" id="touch" />

                <ul className="slide">
                  <li>
                    <a
                      onClick={() => {
                        this.updateData("IBM");
                      }}
                      href="#"
                    >
                      IBM
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.updateData("TSCO.LON");
                      }}
                      href="#"
                    >
                      TSCO.LON
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.updateData("SHOP.TRT");
                        // this.setState({ product: "SHOP.TRT" });
                      }}
                      href="#"
                    >
                      SHOP.TRT
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.updateData("DAI.DEX");
                      }}
                      href="#"
                    >
                      DAI.DEX
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              {" "}
              <GraphMaker product={this.state.product} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",

                justifyContent: "center",
              }}
            >
              <input
                placeholder="Enter number of stocks"
                type={"number"}
                required
                min={0}
                style={{ width: "540px", padding: "15px" }}
                ref={(input) => {
                  this.nameInput = input;
                }}
                onChange={(e) => {
                  this.setState({ number: e.target.value });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "55px",
              }}
            >
              <div>
                <button
                  style={{ margin: "50px" }}
                  onClick={this.buyItem}
                  className="green"
                >
                  Buy
                </button>
                <button
                  style={{ margin: "50px" }}
                  onClick={this.sellItem}
                  className="red"
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5002}
          limit={3}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </>
    );
  }
}

export default BuySellMainPage;
