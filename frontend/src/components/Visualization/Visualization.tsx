import axios from 'axios';
import { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import S from './style';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

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




  const [ticker, setTicker] = useState("");
  const [enableTicker, setEnableTicker] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enableStartDate, setEnableStartDate] = useState(false);
  const [enableEndDate, setEnableEndDate] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [chartType, setChartType] = useState(chartOptions[0]);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [microserviceData, setMicroserviceData] = useState({});




  useEffect(() => {

    setTicker("");
    setEnableTicker(false);
    setStartDate("");
    setEnableStartDate(false);
    setEndDate("");
    setEnableEndDate(false);

    axios.get(`http://localhost:8000/pipes/${pipeId}`).then((res:any) => {
      if (res.data.microservices[props.index].parameters.ticker != undefined) {
        setTicker(res.data.microservices[props.index].parameters.ticker.value ? 
          res.data.microservices[props.index].parameters.ticker.value : 
          res.data.microservices[props.index].parameters.ticker.default);
        setEnableTicker(true);

      }

      if (res.data.microservices[props.index].parameters.start_date != undefined) {
        setEnableStartDate(true);
      }

      if (res.data.microservices[props.index].parameters.end_date != undefined) {
        setEnableEndDate(true);
      }


      const output = JSON.parse(JSON.parse(res.data.output[props.name]));

      setMicroserviceData(res.data.microservices[props.index].parameters);

      console.log("OUTPUT", output)

      const stockObj = Object.keys(output.Close).map((key) => {

        if (output.Date === undefined) {
          return {
            Date: parseInt(key),
            Close: output.Close[key],
            Dividends: output.Dividends[key],
            "Stock Splits": output["Stock Splits"][key],
            High: output.High[key],
            Low: output.Low[key],
            Open: output.Open[key],
            Volume: output.Volume[key]
          }
        } else if (typeof output.Date[key] === "string") {
          console.log("HELLO")
          return {
            Date: new Date(output.Date[key]).getTime(),
            Close: output.Close[key],
            Dividends: output.Dividends[key],
            "Stock Splits": output["Stock Splits"][key],
            High: output.High[key],
            Low: output.Low[key],
            Open: output.Open[key],
            Volume: output.Volume[key]
          }
        } 
      });

      setStock(stockObj);
      console.log("RES", stockObj)
      

      if (stockObj[0].Date != undefined) {
        const start = new Date(stockObj[0].Date);
        if (format(start, "yyyy-MM-dd") != "1970-01-01") {
          setStartDate(format(start, "yyyy-MM-dd"));
        }


      }

      if (stockObj[stockObj.length - 1].Date != undefined) {
        let endDate = new Date(stockObj[stockObj.length - 1].Date);
        // add extra day to endDate
        endDate.setDate(endDate.getDate() + 1);
        if (format(endDate, "yyyy-MM-dd") != "1970-01-02") {
          setEndDate(format(endDate, "yyyy-MM-dd"));
        }
      }
    }).catch((err) => {
      console.error(err);
    });
  }, [refresh, props.name])


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
    const updatedParams = {...microserviceData}

    updatedParams["ticker"] = {...updatedParams["ticker"], value: ticker};
    updatedParams["start_date"] = {...updatedParams["start_date"], value: startDate};
    updatedParams["end_date"] = {...updatedParams["end_date"], value: endDate};


    axios.put(`http://localhost:8000/pipes/${pipeId}/microservices`, {"name":props.name , "parameters": updatedParams}).then((res) => {
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

  // round to 2 decimal places
  const roundPrice = (price: number) => {

    if (stock.find((el) => el.Volume == price)) {
      return price;
    }

    const priceNew = Math.round(price * 100) / 100;

    return "$" + priceNew.toString() + " USD";
  }


  const [showClose, setShowClose] = useState(true);
  const [showOpen, setShowOpen] = useState(false);
  const [showHigh, setShowHigh] = useState(false);
  const [showLow, setShowLow] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showDividends, setShowDividends] = useState(false);

  return (
    <S.Container>
      <S.GraphContainer>
        
        { chartType.value == 'bar' &&
          <ResponsiveContainer width="95%" height={"90%"}>
          <BarChart data={stock}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" domain={['dataMin', 'dataMax']} tickFormatter={formatDate} />
            <YAxis width={80}/>
            <Tooltip labelFormatter={formatDate} formatter={roundPrice}/>
            <Legend />
            {showClose && <Bar dataKey="Close" fill="#02b2af"/>}
            {showOpen && <Bar dataKey="Open" fill="#8884d8"/>}
            {showHigh && <Bar dataKey="High" fill="#82ca9d"/>}
            {showLow && <Bar dataKey="Low" fill="#ffc658"/>}
            {showVolume && <Bar dataKey="Volume" fill="#ff0000"/>}
            {showDividends && <Bar dataKey="Dividends" fill="#0000ff"/>}
          </BarChart>
          </ResponsiveContainer>
        }

        { chartType.value == 'line' &&
          <ResponsiveContainer width="95%" height={"90%"}>
            <LineChart data={stock}>
              {showClose && <Line type="monotone" dataKey="Close" stroke="#02b2af" strokeWidth={2}/>}
              {showOpen && <Line type="monotone" dataKey="Open" stroke="#8884d8" strokeWidth={2}/>}
              {showHigh && <Line type="monotone" dataKey="High" stroke="#82ca9d" strokeWidth={2}/>}
              {showLow && <Line type="monotone" dataKey="Low" stroke="#ffc658" strokeWidth={2}/>}
              {showVolume && <Line type="monotone" dataKey="Volume" stroke="#ff0000" strokeWidth={2}/> } 
              {showDividends && <Line type="monotone" dataKey="Dividends" stroke="#0000ff" strokeWidth={2}/>}
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="Date" scale="time" domain={['dataMin', 'dataMax']} type="number" tickFormatter={formatDate} />
              <YAxis width={80}/>
              <Tooltip labelFormatter={formatDate} formatter={roundPrice}/>
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        }

        <S.ButtonGroup>
          <Button onClick={() => setShowClose(!showClose)} variant={showClose ? "primary" : "secondary"}>Close</Button>
          <Button onClick={() => setShowOpen(!showOpen)} variant={showOpen ? "primary" : "secondary"}>Open</Button>
          <Button onClick={() => setShowHigh(!showHigh)} variant={showHigh ? "primary" : "secondary"}>High</Button>
          <Button onClick={() => setShowLow(!showLow)} variant={showLow ? "primary" : "secondary"}>Low</Button>
          <Button onClick={() => setShowVolume(!showVolume)} variant={showVolume ? "primary" : "secondary"}>Volume</Button>
          <Button onClick={() => setShowDividends(!showDividends)} variant={showDividends ? "primary" : "secondary"}>Dividends</Button>
        </S.ButtonGroup>
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
          <Form.Control type="text" value={ticker ? ticker : ""} onChange={handleStockChange} disabled={!enableTicker}/>
          <Form.Text className="text-muted">
            Choose which stock to visualize
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="text" value={startDate ? startDate : ""} onChange={handleStartDateChange} onClick={() => setShowStartCalendar(!showStartCalendar)} disabled={!enableStartDate}/>
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
          <Form.Control type="text" value={endDate ? endDate : ""} onChange={handleEndDateChange} disabled={!enableEndDate}/>
          <Form.Text className="text-muted">
            Choose the end date
          </Form.Text>
        </Form.Group>
        <button disabled={!ticker || !startDate || !endDate} type="submit" className="btn btn-primary" onClick={(e) => handleSave(e)}>Update</button>
      </Form>
    </S.Container>
  );
}
