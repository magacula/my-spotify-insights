import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const AudioFeaturesChart = () => {
  const [chartData, setChartData] = useState({});

  const [audioValue, setAudioValue] = useState([]);
  const [featureType, setFeatureType] = useState([]);

  const fetchChartData = () => {
    let acousticness = [];
    let danceability = [];
    let energy = [];
    let speechiness = [];
    let instrumentalness = [];
    let liveness = [];
    let tempo = [];
    let valence = [];

    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    fetch("http://127.0.0.1:5000/user/top_audio_features", {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.top_tracks_audio_features);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div style={{ marginLeft: "110px" }}>
      <Bar
        data=""
        options={{
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Top Tracks Audio Features`,
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
        }}
      />
    </div>
  );
};

export default AudioFeaturesChart;

// const state = {
//   data: {
//     labels: [
//       "danceability",
//       "energy",
//       "speechiness",
//       "acousticness",
//       "instrumentalness",
//       "liveness",
//       "tempo",
//       "valence",
//     ],
//     datasets: [
//       {
//         label: "Rainfall",
//         backgroundColor: "rgba(97, 199, 199, 1)",
//         borderColor: "rgba(0,0,0,1)",
//         borderWidth: 2,
//         data: [65, 59, 80, 81, 56],
//       },
//     ],
//   },
//   options: {
//     legend: {
//       display: false,
//     },
//     title: {
//       display: true,
//       text: `Track Audio Features`,
//       fontSize: 20,
//       fontColor: "#ffffff",
//       padding: 30,
//     },
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             color: "rgba(255, 255, 255, 0.3)",
//           },
//           ticks: {
//             fontSize: 12,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             color: "rgba(255, 255, 255, 0.3)",
//           },
//           ticks: {
//             beginAtZero: true,
//             fontSize: 12,
//           },
//         },
//       ],
//     },
//   },
// };

// class AudioFeatureChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   fetchAudioData = async () => {
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5000/user/top_audio_features",
//         {
//           credentials: "include",
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       ); // invokes a fetch request to audio feature data
//       const data = await response.json();
//       console.log(data);
//       // this.setState(data.top_tracks_audio_features);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Getting the average of the total audio features
//   avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

//   createChart(dataset) {
//     const ctx = document.getElementById("chart");
//     const labels = Object.keys(dataset);
//     const data = Object.values(dataset);

//     new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: [
//           "danceability",
//           "energy",
//           "speechiness",
//           "acousticness",
//           "instrumentalness",
//           "liveness",
//           "tempo",
//           "valence",
//         ],
//         datasets: [
//           {
//             label: "",
//             data,
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.3)",
//               "rgba(255, 159, 64, 0.3)",
//               "rgba(255, 206, 86, 0.3)",
//               "rgba(75, 192, 192, 0.3)",
//               "rgba(54, 162, 235, 0.3)",
//               "rgba(104, 132, 245, 0.3)",
//               "rgba(153, 102, 255, 0.3)",
//             ],
//             borderColor: [
//               "rgba(255,99,132,1)",
//               "rgba(255, 159, 64, 1)",
//               "rgba(255, 206, 86, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(104, 132, 245, 1)",
//               "rgba(153, 102, 255, 1)",
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         layout: {
//           padding: {
//             left: 0,
//             right: 0,
//             top: 0,
//             bottom: 0,
//           },
//         },
//         title: {
//           display: true,
//           text: `Audio Features`,
//           fontSize: 18,
//           fontColor: "#ffffff",
//           padding: 30,
//         },
//         legend: {
//           display: false,
//         },
//         scales: {
//           xAxes: [
//             {
//               gridLines: {
//                 color: "rgba(255, 255, 255, 0.3)",
//               },
//               ticks: {
//                 fontSize: 12,
//               },
//             },
//           ],
//           yAxes: [
//             {
//               gridLines: {
//                 color: "rgba(255, 255, 255, 0.3)",
//               },
//               ticks: {
//                 beginAtZero: true,
//                 fontSize: 12,
//               },
//             },
//           ],
//         },
//       },
//     });
//   }

//   render() {
//     return (
//       <div style={{ marginLeft: "110px" }}>
//         {/* <Bar data={state.data} options={state.options} /> */}
//         <canvas id="chart" width="600" height="400" />
//       </div>
//     );
//   }
// }
