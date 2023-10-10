import axios from 'axios';
import S from "./style";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { format } from "date-fns";


import Logo from "assets/logo.svg";


import { BarChart } from '@mui/x-charts/BarChart';

export default function ChartComponent({stockName}) {

  const [stock, setStock] = useState({
    "Date": ["2023-09-07T00:00:00-04:00"],
    "Open": [0],
    "High": [0],
    "Low": [0],
    "Close": [0],
    "Volume": [0],
    "Dividends": [0],
    '"Stock Splits"': [0]
  });


  useEffect(() => {
    axios.get(`http://localhost:8000/get_stock_data/${stockName}`).then((res) => setStock(res.data));
  }, [])

  const formatDate = (date: string) => {
    return format(new Date(date), "dd-MM-yyyy");
  }

  console.log(stock)
  return (
    <BarChart
      xAxis={[
        {
          id: 'Date',
          data: stock.Date,
          scaleType: 'band',
          valueFormatter: formatDate,
          label: 'Date',
        },
      ]}
      series={[
        {
          data: stock.Close,
          label: 'Closing Price $',
        },
      ]}
      width={1600}
      height={600}
    />
  );
};
