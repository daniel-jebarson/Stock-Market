import React from "react";

import "./style.css";

import { Line } from "react-chartjs-2";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: [],
      yValue: [],
      symbols: [
        "IBM",
        "TSCO.LON",
        "SHOP.TRT",
        "GPV.TRV",
        "DAI.DEX",
        "RELIANCE.BSE",
      ],
      selected: "IBM",
    };
  }

  fetchData = (name) => {
    const API_REQ = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${name}&outputsize=full&apikey=demo`;
    let dates_json = [];
    let values_json = [];
    fetch(API_REQ)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data["Time Series (Daily)"]["2022-08-12"]["1. open"]);
        let skip = 0;
        let total = 35;
        let count = 0;
        for (let i in data["Time Series (Daily)"]) {
          if (skip % 25 === 0) {
            count++;
            dates_json.push(i);
            values_json.push(data["Time Series (Daily)"][i]["1. open"]);
          }
          skip++;
          if (count > total) {
            break;
          }
        }
        this.setState({
          xValue: dates_json,
          yValue: values_json,
        });
      });
  };

  componentDidMount = () => {
    let symbols = this.state.symbols;
    var item = symbols[Math.floor(Math.random() * symbols.length)];
    this.setState({
      selected: item,
    });
    this.fetchData(item);
  };

  render() {
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "STOCK MARKET GRAPH",
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Date - >",
              fontColor: "white",
              fontSize: 18,
            },
            ticks: {
              fontColor: "white",
              fontSize: 8,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Cost - >",
              fontColor: "white",
              fontSize: 18,
            },
            ticks: {
              fontColor: "white",
              fontSize: 14,
            },
          },
        ],
      },
    };
    let h = window.screen.availHeight;
    const mystyle = {
      height: h,
      display: "flex",
      justifyContent: "center",
    };
    const contStyle = {};
    return (
      <div style={mystyle}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
            height: "800px",
            width: "1400px",
          }}
        >
          <Line
            height={window.screen.availHeight - 40}
            width={window.screen.availWidth - 20}
            datasetIdKey="id"
            options={options}
            data={{
              labels: this.state.xValue,

              datasets: [
                {
                  id: 1,
                  label: this.state.selected,
                  data: this.state.yValue,
                  fill: true,
                  backgroundColor: "#6ab7e733",
                  borderColor: "#288fca",

                  pointStyle: "star",
                  pointBorderColor: "#06659f",
                  pointBackgroundColor: "white",
                },
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

export default LineChart;
