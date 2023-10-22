import axios from 'axios';
import { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import S from './style';

import { BarChart } from '@mui/x-charts/BarChart';

interface ChartProps {
  stockName: string
  children?: ReactNode
}

export default function ChartComponent(props: ChartProps) {
  const stockName = props.stockName;

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

  const [ticker, setTicker] = useState("AAPL");




  useEffect(() => {
    axios.get(`http://localhost:8000/pipes/${stockName}`).then((res:any) => {     
      const data = JSON.parse(res.data.output.import_yahoo);
      console.log(res.data);
      setStock(data);
      setTicker(res.data.microservices[0].parameters.ticker);
    });
  }, [])



  const formatDate = (date: string) => {
    return format(new Date(date), "dd-MM-yyyy");
  }

  



  return (
    <S.Container>
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

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Stock Name</Form.Label>
          <Form.Control type="text" value={ticker}/>
          <Form.Text className="text-muted">
            Enter the stock name to get the visualization
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="text" value={stock.Date[0]} />
          <Form.Text className="text-muted">
            Choose the start date
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="text" value={stock.Date[stock.Date.length-1]} />
          <Form.Text className="text-muted">
            Choose the end date
          </Form.Text>
        </Form.Group>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </S.Container>
  );
}
