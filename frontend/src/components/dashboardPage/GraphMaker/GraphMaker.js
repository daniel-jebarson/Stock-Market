import { Line } from "react-chartjs-2";
import { Component } from "react";
import "./style.css";

class GraphMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: [],
      yValue: [],
    };
  }

  fetchData = (props) => {
    const API_REQ = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${props.product}&outputsize=full&apikey=demo`;
    let dates_json = [];
    let values_json = [];
    fetch(API_REQ)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let skip = 0;
        let total = 10;
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
    this.fetchData(this.props);
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

    return (
      <div
        style={{
          backgroundColor: "transparent",
          height: "440px",
          width: "870px",
        }}
      >
        <Line
          datasetIdKey="id"
          options={options}
          data={{
            labels: this.state.xValue,
            datasets: [
              {
                id: 1,
                label: this.props.product,
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
    );
  }
}

export default GraphMaker;
