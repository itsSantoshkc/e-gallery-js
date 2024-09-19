"use client";

import { elements } from "chart.js";
import React from "react";
import { Bar, Line } from "react-chartjs-2";

function getLast7Days() {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i); // Subtracting 'i' days from today
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    dates.push(`${day}/${month}`);
  }

  return dates;
}

const labels = getLast7Days();

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

const LineChart = ({ className, orderData }) => {
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
        data: [50, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  function groupByDate(data, dateKey) {
    return data.reduce((acc, item) => {
      const date = new Date(item[dateKey]).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  }

  // const { product_Id, orderAt } = orderData;
  console.log(orderData);
  // console.log(product_Id, orderAt);
  // if (orderData !== undefined && orderData !== null) {
  //   groupByDate(product_Id, orderAt);
  // }

  console.log(data.datasets.data);
  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
