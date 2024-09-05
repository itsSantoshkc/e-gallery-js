"use client";

import { elements } from "chart.js";
import React from "react";
import { Bar, Line } from "react-chartjs-2";

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
      label: "Items Sold",
      color: "#a2d2ff",
      borderColor: "#36A2EB",
      backgroundColor: ["rgba(162, 210, 255,0.5)"],
      fill: true,
      font: {
        size: 14,
      },
      data: [50, 10, 5, 2, 20, 30, 45, 110, 50, 30, 95, 25],
    },
  ],
};

const LineChart = ({ className }) => {
  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
