import axios from 'axios';
import S from "./style";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";


import Logo from "assets/logo.svg";


import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartComponent() {
  const [stock, setStock] = useState({});
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

  useEffect(() => {
    axios.post("http://localhost:8000/get_stock_data/aapl").then((res: {}) => setStock(res))
  }, [stock])

  get_stock_data()
  console.log(stock)
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
