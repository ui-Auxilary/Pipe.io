import S from "./style";
import { Button } from "react-bootstrap";
import { useState } from "react";


import Logo from "assets/logo.svg";


import { BarChart } from '@mui/x-charts/BarChart';

import React from 'react';


const ChartComponent = () => {
  return (
    <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['bar A', 'bar B', 'bar C'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [2, 5, 3],
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default ChartComponent;

function get_stock_data() {
  fetch(`http://localhost:8000/get_stock_data/aapl`)
   .then((res) => res.json())
   .then((data) => {
      console.log(data);
    })
   .catch((error) => {
      console.log(error);
    });
}