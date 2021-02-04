import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

const state = {
  data: {
    labels: [
      "danceability",
      "energy",
      "speechiness",
      "acousticness",
      "instrumentalness",
      "liveness",
      "tempo",
      "valence",
    ],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: "rgba(97, 199, 199, 1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `Track Audio Features`,
      fontSize: 20,
      fontColor: "#ffffff",
      padding: 30,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          ticks: {
            fontSize: 12,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          ticks: {
            beginAtZero: true,
            fontSize: 12,
          },
        },
      ],
    },
  },
};

export default class AudioFeatureChart extends Component {
  componentDidMount() {
    this.fetchAudioData();
  }

  componentDidUpdate() {
    this.fetchAudioData();
  }

  fetchAudioData = () => {
    const { features } = this.props;
    // const dataset = this.createDataset(features);
    // this.createChart(dataset);
  };

  // createDataset(features) {
  //   const dataset = {};
  //   properties.forEach((prop) => {
  //     dataset[prop] = features.length
  //       ? this.avg(features.map((feat) => feat && feat[prop]))
  //       : features[prop];
  //   });
  //   return dataset;
  // }

  // createChart(dataset) {
  //   const { type } = this.props;
  //   const ctx = document.getElementById("chart");
  //   const labels = Object.keys(dataset);
  //   const data = Object.values(dataset);

  //   new Chart(ctx, {
  //     type: type || "bar",
  //     data: {
  //       labels,
  //       datasets: [
  //         {
  //           label: "",
  //           data,
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.3)",
  //             "rgba(255, 159, 64, 0.3)",
  //             "rgba(255, 206, 86, 0.3)",
  //             "rgba(75, 192, 192, 0.3)",
  //             "rgba(54, 162, 235, 0.3)",
  //             "rgba(104, 132, 245, 0.3)",
  //             "rgba(153, 102, 255, 0.3)",
  //           ],
  //           borderColor: [
  //             "rgba(255,99,132,1)",
  //             "rgba(255, 159, 64, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(104, 132, 245, 1)",
  //             "rgba(153, 102, 255, 1)",
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       layout: {
  //         padding: {
  //           left: 0,
  //           right: 0,
  //           top: 0,
  //           bottom: 0,
  //         },
  //       },
  //       title: {
  //         display: true,
  //         text: `Audio Features`,
  //         fontSize: 18,
  //         fontFamily: `${fonts.primary}`,
  //         fontColor: "#ffffff",
  //         padding: 30,
  //       },
  //       legend: {
  //         display: false,
  //       },
  //       scales: {
  //         xAxes: [
  //           {
  //             gridLines: {
  //               color: "rgba(255, 255, 255, 0.3)",
  //             },
  //             ticks: {
  //               fontFamily: `${fonts.primary}`,
  //               fontSize: 12,
  //             },
  //           },
  //         ],
  //         yAxes: [
  //           {
  //             gridLines: {
  //               color: "rgba(255, 255, 255, 0.3)",
  //             },
  //             ticks: {
  //               beginAtZero: true,
  //               fontFamily: `${fonts.primary}`,
  //               fontSize: 12,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }

  render() {
    return (
      <div style={{ marginLeft: "110px" }}>
        <Bar data={state.data} options={state.options} />
      </div>
    );
  }
}
