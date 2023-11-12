import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer} from 'recharts';
import {formatDate, roundPrice} from './chartHelper';
import { ChartProps } from 'types/VisualizationTypes';


export default function BarChartComponent(props: ChartProps) {
  const {stock, showClose, showOpen, showHigh, showLow, showVolume, showMovingAverage, showRSI} = props.chartData;
  return(
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
        {showMovingAverage && <Bar dataKey="moving_average" fill="#0000ff"/>}
        {showRSI && <Bar dataKey="RSI" fill="#000000"/>}
      </BarChart>
    </ResponsiveContainer>
  );
}



