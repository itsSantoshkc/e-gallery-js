"use client";

import React from "react";
import { Line } from "react-chartjs-2";

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
  const last7DaysHashMap = new Map();

  function getLast7Days() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i); // Subtracting 'i' days from today
      const day = date.getDate();
      const month = date.getMonth(); // Months are zero-based in JavaScript
      const newDate = new Date().setMonth(month, day);
      const splitedDate = new Date(newDate).toString().split(" ");
      dates.push(`${splitedDate[1]} ${splitedDate[2]}`);
      last7DaysHashMap.set(date.toISOString().slice(0, 10), 0);
    }

    return dates;
  }

  const labels = getLast7Days();
  orderData.forEach((order) => {
    const formattedDate = order.orderAt.slice(0, 10);
    last7DaysHashMap.set(
      formattedDate,
      last7DaysHashMap.get(formattedDate) + order.orderedQuantity
    );
  });
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
        data: Array.from(last7DaysHashMap.values()),
      },
    ],
  };

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
