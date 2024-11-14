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

const Last7DaysChart = ({ className, orderData }) => {
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
  console.log(orderData);
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

const Last15DaysChart = ({ className, orderData }) => {
  const last15DaysHashMap = new Map();
  function getLast15Days() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i); // Subtracting 'i' days from today
      const day = date.getDate();
      const month = date.getMonth(); // Months are zero-based in JavaScript
      const newDate = new Date().setMonth(month, day);
      const splitedDate = new Date(newDate).toString().split(" ");
      dates.push(`${splitedDate[1]} ${splitedDate[2]}`);
      last15DaysHashMap.set(date.toISOString().slice(0, 10), 0);
    }

    return dates;
  }

  const labels = getLast15Days();
  orderData.forEach((order) => {
    const formattedDate = order.orderAt.slice(0, 10);
    last15DaysHashMap.set(
      formattedDate,
      last15DaysHashMap.get(formattedDate) + order.orderedQuantity
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
        data: Array.from(last15DaysHashMap.values()),
      },
    ],
  };

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

const Last6MonthsChart = ({ className, orderData }) => {
  const last6MonthHashMap = new Map();
  function getLast6Months() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthName = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      dates.push(`${monthName} ${year}`);
      last6MonthHashMap.set(`${monthName} ${year}`, 0);
    }
    return dates;
  }
  const labels = getLast6Months();
  orderData.forEach((order) => {
    const date = new Date(order.orderAt);
    const year = date.getFullYear();
    const monthName = date.toLocaleString("default", { month: "short" });
    const formattedDate = `${monthName} ${year}`;
    last6MonthHashMap.set(
      formattedDate,
      last6MonthHashMap.get(formattedDate) + order.orderedQuantity
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
        data: Array.from(last6MonthHashMap.values()),
      },
    ],
  };

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

const Last12MonthsChart = ({ className, orderData }) => {
  const last12MonthHash = new Map();
  function getLast6Months() {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthName = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      dates.push(`${monthName} ${year}`);
      last12MonthHash.set(`${monthName} ${year}`, 0);
    }
    return dates;
  }
  const labels = getLast6Months();
  orderData.forEach((order) => {
    const date = new Date(order.orderAt);
    const year = date.getFullYear();
    const monthName = date.toLocaleString("default", { month: "short" });
    const formattedDate = `${monthName} ${year}`;
    last12MonthHash.set(
      formattedDate,
      last12MonthHash.get(formattedDate) + order.orderedQuantity
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
        data: Array.from(last12MonthHash.values()),
      },
    ],
  };

  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  );
};

export { Last15DaysChart, Last7DaysChart, Last6MonthsChart, Last12MonthsChart };
