import axios from 'axios';
import { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import S from './style';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// import { BarChart } from '@mui/x-charts/BarChart';
// import { LineChart } from '@mui/x-charts/LineChart';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

interface ChartProps {
  pipeId: string
  data: any
  name: string
  index: number
  children?: ReactNode
}

export default function ChartComponent(props: ChartProps) {
  const pipeId = props.pipeId;

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

  const chartOptions = [
    { value: 'line', label: 'Line' },
    { value: 'bar', label: 'Bar' },
  ];


  const [ticker, setTicker] = useState("AAPL");

  const [startDate, setStartDate] = useState("2021-09-07T00:00:00-04:00");
  const [endDate, setEndDate] = useState("2021-09-07T00:00:00-04:00");

  const [refresh, setRefresh] = useState(false);
  const [chartType, setChartType] = useState(chartOptions[0]);
  const [showStartCalendar, setShowStartCalendar] = useState(false);


  useEffect(() => {
    axios.get(`http://localhost:8000/pipes/${pipeId}`).then((res:any) => {     
      setTicker(res.data.microservices[props.index].parameters.ticker);
      const output = JSON.parse(JSON.parse(res.data.output[props.name]));

      const stockObj = Object.keys(output.Close).map((key) => {
        return {
          Date: parseInt(key),
          Close: output.Close[key]
        }
      });

      setStock(stockObj);
      console.log("RES", stockObj)

      const start = new Date(stockObj[0].Date);
      let endDate = new Date(stockObj[stockObj.length - 1].Date);
      // add extra day to endDate
      endDate.setDate(endDate.getDate() + 1);
      setStartDate(format(start, "yyyy-MM-dd"));
      setEndDate(format(endDate, "yyyy-MM-dd"));
    });
  }, [refresh])


  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yy");
  }

  const handleStockChange = (e: any) => {
    setTicker(e.target.value);
  }

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  }

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  }

  console.log("ENDDATE", endDate)

  const handleSave = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/pipes/${pipeId}/microservices`, {"name":props.name , "parameters": {"ticker": ticker, "start_date": startDate, "end_date": endDate}}).then((res) => {
      console.log(res)
      updateStock();
    }).catch((err) => {
      console.log(err)
    });
  };


  const updateStock = () => {
    axios.post(`http://localhost:8000/pipes/execute`, null,  { params: { id: pipeId } }).then((res) => {
      console.log(res)
      setRefresh(!refresh);
    }).catch((err) => {
      console.log(err)
    });
  }



  return (
    <S.Container>
      <S.GraphContainer>
        { chartType.value == 'bar' &&
          <BarChart width={1500} height={500} data={stock}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" domain={['dataMin', 'dataMax']} tickFormatter={formatDate} />
            <YAxis />
            <Tooltip labelFormatter={formatDate} />
            <Legend />
            <Bar dataKey="Close" fill="#02b2af"/>
          </BarChart>
        }

        { chartType.value == 'line' &&
          <LineChart width={1400} height={600} data={stock}>
            <Line type="monotone" dataKey="Close" stroke="#02b2af" strokeWidth={2}/>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="Date" scale="time" domain={['dataMin', 'dataMax']} type="number" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip labelFormatter={formatDate}/>
            <Legend />
          </LineChart>
        }
      </S.GraphContainer>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Chart Type</Form.Label>
          <Select
              options={chartOptions}
              value={chartType}
              onChange={setChartType}
            >
          </Select>
          <Form.Text className="text-muted">
            Select Chart Type
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Stock Name</Form.Label>
          <Form.Control type="text" value={ticker} onChange={handleStockChange}/>
          <Form.Text className="text-muted">
            Choose which stock to visualize
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="text" value={startDate} onChange={handleStartDateChange} onClick={() => setShowStartCalendar(!showStartCalendar)}/>
{/*           
          {showStartCalendar && <S.CalendarContainer>
          <Calendar onChange={setStartDate} value={new Date(startDate)}/>
          </S.CalendarContainer>
          } */}


          <Form.Text className="text-muted">
            Choose the start date
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="text" value={endDate} onChange={handleEndDateChange}/>
          <Form.Text className="text-muted">
            Choose the end date
          </Form.Text>
        </Form.Group>
        <button type="submit" className="btn btn-primary" onClick={(e) => handleSave(e)}>Update</button>
      </Form>
    </S.Container>
  );
}
