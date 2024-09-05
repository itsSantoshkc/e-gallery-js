"use client";

import React from "react";
import Chart from "chart.js/auto";
import { Doughnut, Line, Pie } from "react-chartjs-2";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
];

const options = {
  repsonsive: true,
  elements: {
    point: {
      radius: 10,
      backgroundColor: "rgb(162, 210, 255)",
    },
    line: {
      tension: 0.5,
    },
  },

  plugins: {
    display: true,
    position: "bottom",
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
  },
};

const data = {
  labels: labels,
  datasets: [
    {
      label: "Sold Quantity",
      backgroundColor: [
        "#FF3380",
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A6",
        "#33FFF6",
        "#FFD733",
        "#8E33FF",
        "#33FFB2",
        "#5733FF",
        "#FF8C33",
        "#33D1FF",
      ],
      data: [0, 10, 5, 2, 20, 30, 45, 100],
    },
  ],
};

const DoughnutChart = ({ className }) => {
  return (
    <div className={className}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
