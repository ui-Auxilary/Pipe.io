import axios from 'axios';
import { ReactNode, useEffect, useState } from "react";
import { format } from "date-fns";
import Form from 'react-bootstrap/Form';
import S from './style';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import { ChartComponentProps } from 'types/VisualizationTypes';
import { isClose, isHigh, isLow, isMovingAverage, isOpen, isRSI, isVolume } from './Charts/chartHelper';

import LineChartComponent from './Charts/LineChart';
import BarChartComponent from './Charts/BarChart';
import AreaChartComponent from './Charts/AreaChart';
import ComposedChartComponent from './Charts/ComposedChart';


export default function ChartComponent(props: ChartComponentProps) {
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
    { value: 'area', label: 'Area' },
    { value: 'composed', label: 'Composed' }
  ];

  const [ticker, setTicker] = useState("");
  const [enableTicker, setEnableTicker] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enableStartDate, setEnableStartDate] = useState(false);
  const [enableEndDate, setEnableEndDate] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [chartType, setChartType] = useState(chartOptions[0]);
  const [microserviceData, setMicroserviceData] = useState({});



  useEffect(() => {
    setTicker("");
    setEnableTicker(false);
    setStartDate("");
    setEnableStartDate(false);
    setEndDate("");
    setEnableEndDate(false);

    axios.get(`http://localhost:8000/pipes/${pipeId}`).then((res: any) => {
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

      const outputIdx = res.data.microservices.findIndex(x => x.name === props.name)
      const output = JSON.parse(res.data.output[outputIdx]?.output) || {};

      setMicroserviceData(res.data.microservices[props.index].parameters);

      const stockObj = Object.keys(output.Close).map((key) => {
        if (output.Date === undefined) {
          const temp = { Date: parseInt(key) }
          for (const [key2, value] of Object.entries(output)) {
            temp[key2] = value[key];
          }
          return temp;
        } else if (typeof output.Date[key] === "string") {
          const temp = { Date: new Date(output.Date[key]).getTime() }
          for (const [key2, value] of Object.entries(output)) {
            if (key2 != "Date") {
              temp[key2] = value[key];
            }
          }
          return temp;
        } else if (typeof output.Date[key] === "number") {
          const temp = { Date: output.Date[key] }
          for (const [key2, value] of Object.entries(output)) {
            if (key2 != "Date") {
              temp[key2] = value[key];
            }
          }
          return temp;
        }
      });

      setStock(stockObj);

      if (stockObj[0] && stockObj[0].Date != undefined) {
        const start = new Date(stockObj[0].Date);
        if (format(start, "yyyy-MM-dd") != "1970-01-01") {
          setStartDate(format(start, "yyyy-MM-dd"));
        }
      }

      if (stockObj[stockObj.length - 1] && stockObj[stockObj.length - 1].Date != undefined) {
        let endDate = new Date(stockObj[stockObj.length - 1].Date);
        // add extra day to endDate
        endDate.setDate(endDate.getDate() + 1);
        if (format(endDate, "yyyy-MM-dd") != "1970-01-02") {
          setEndDate(format(endDate, "yyyy-MM-dd"));
        }
      }
    })
  }, [refresh, props.name])

  const handleStockChange = (e: any) => {
    setTicker(e.target.value);
  }

  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  }

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  }

  const handleSave = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const updatedParams = { ...microserviceData }

    updatedParams["ticker"] = { ...updatedParams["ticker"], value: ticker };

    if (enableStartDate && enableEndDate) {
      updatedParams["start_date"] = { ...updatedParams["start_date"], value: startDate };
      updatedParams["end_date"] = { ...updatedParams["end_date"], value: endDate };
    }

    axios.put(`http://localhost:8000/pipes/${pipeId}/microservices`, { "name": props.name, "parameters": updatedParams }).then(() => {
      updateStock();
    });
  };

  const updateStock = () => {
    axios.post(`http://localhost:8000/pipes/execute`, null,  { params: { id: pipeId } }).then(() => {
      setRefresh(!refresh);
    });
  }


  const [showClose, setShowClose] = useState(true);
  if (stock[0] && stock[0].Close == undefined) {
    setShowClose(false);
  }

  const [showOpen, setShowOpen] = useState(false);
  const [showHigh, setShowHigh] = useState(false);
  const [showLow, setShowLow] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showMovingAverage, setShowMovingAverage] = useState(false);
  const [showRSI, setShowRSI] = useState(false);


  const chartData = {
    stock : stock,
    showClose : showClose,
    showOpen : showOpen,
    showHigh : showHigh,
    showLow : showLow,
    showVolume : showVolume,
    showMovingAverage : showMovingAverage,
    showRSI : showRSI
  }

  return (
    <S.Container>
      <S.GraphContainer>
        { chartType.value == 'bar' && <BarChartComponent chartData={chartData}/>}
        { chartType.value == 'line' && <LineChartComponent chartData={chartData}/>}
        { chartType.value == 'area' && <AreaChartComponent chartData={chartData}/>}
        { chartType.value == 'composed' && <ComposedChartComponent chartData={chartData}/>}
        <S.ButtonGroup>
          {isClose(stock) && <Button onClick={() => setShowClose(!showClose)} variant={showClose ? "primary" : "secondary"}>Close</Button>}
          {isOpen(stock) && <Button onClick={() => setShowOpen(!showOpen)} variant={showOpen ? "primary" : "secondary"}>Open</Button>}
          {isHigh(stock) && <Button onClick={() => setShowHigh(!showHigh)} variant={showHigh ? "primary" : "secondary"}>High</Button>}
          {isLow(stock) && <Button onClick={() => setShowLow(!showLow)} variant={showLow ? "primary" : "secondary"}>Low</Button>}
          {isVolume(stock) && <Button onClick={() => setShowVolume(!showVolume)} variant={showVolume ? "primary" : "secondary"}>Volume</Button>}
          {isMovingAverage(stock) && <Button onClick={() => setShowMovingAverage(!showMovingAverage)} variant={showMovingAverage ? "primary" : "secondary"}>Moving Average</Button>}
          {isRSI(stock) && <Button onClick={() => setShowRSI(!showRSI)} variant={showRSI ? "primary" : "secondary"}>RSI</Button>}
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
          <Form.Control type="text" value={ticker ? ticker : ""} onChange={handleStockChange} disabled={!enableTicker} />
          <Form.Text className="text-muted">
            Choose which stock to visualize
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="text" value={startDate ? startDate : ""} onChange={handleStartDateChange} onClick={() => setShowStartCalendar(!showStartCalendar)} disabled={!enableStartDate}/>

          <Form.Text className="text-muted">
            Choose the start date
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control type="text" value={endDate ? endDate : ""} onChange={handleEndDateChange} disabled={!enableEndDate} />
          <Form.Text className="text-muted">
            Choose the end date
          </Form.Text>
        </Form.Group>
        <Button disabled={!ticker || !startDate || !endDate} type="submit" className="btn btn-primary" onClick={(e:any) => handleSave(e)}>Update</Button>
      </Form>
    </S.Container>
  );
}
