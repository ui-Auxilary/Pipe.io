import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer}  from 'recharts';
import {formatDate, roundPrice} from './chartHelper';
import { ChartProps } from 'types/VisualizationTypes';


export default function LineChartComponent(props: ChartProps) {
  const {stock, showClose, showOpen, showHigh, showLow, showVolume, showMovingAverage, showRSI} = props.chartData;
  return(
    <ResponsiveContainer width="95%" height={"90%"}>
      <LineChart data={stock}>
        {showClose && <Line type="monotone" dataKey="Close" stroke="#02b2af" strokeWidth={2}/>}
        {showOpen && <Line type="monotone" dataKey="Open" stroke="#8884d8" strokeWidth={2}/>}
        {showHigh && <Line type="monotone" dataKey="High" stroke="#82ca9d" strokeWidth={2}/>}
        {showLow && <Line type="monotone" dataKey="Low" stroke="#ffc658" strokeWidth={2}/>}
        {showVolume && <Line type="monotone" dataKey="Volume" stroke="#ff0000" strokeWidth={2}/> } 
        {showMovingAverage && <Line type="monotone" dataKey="moving_average" stroke="#0000ff" strokeWidth={2}/>}
        {showRSI && <Line type="monotone" dataKey="RSI" stroke="#000000" strokeWidth={2}/>}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date" scale="time" domain={['dataMin', 'dataMax']} type="number" tickFormatter={formatDate} />
        <YAxis width={80}/>
        <Tooltip labelFormatter={formatDate} formatter={roundPrice}/>
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )

}
