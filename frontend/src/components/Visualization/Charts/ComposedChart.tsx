import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer, Area, ComposedChart} from 'recharts';
import {formatDate, roundPrice} from './chartHelper';
import { ChartProps } from 'types/VisualizationTypes';



export default function ComposedChartComponent(props: ChartProps) {
  const {stock, showClose, showOpen, showHigh, showLow, showVolume, showMovingAverage, showRSI, showFuture} = props.chartData;
  const roundValue = (price: number) => {
    return roundPrice(showVolume, showRSI, showMovingAverage, price, stock);
  }

  return (
    <ResponsiveContainer width="95%" height={"90%"}>
      <ComposedChart data={stock}>
        {showClose && <Bar dataKey="Close" fill="#02b2af"/>}
        {showOpen && <Bar dataKey="Open" fill="#8884d8"/>}
        {showHigh && <Bar dataKey="High" fill="#82ca9d"/>}
        {showLow && <Bar dataKey="Low" fill="#ffc658"/>}
        {showVolume && <Bar dataKey="Volume" fill="#ff0000"/>}
        {showMovingAverage && <Line type="monotone" dataKey="moving_average" stroke="#0000ff" strokeWidth={2}/>}
        {showRSI && <Line type="monotone" dataKey="RSI" stroke="#000000" strokeWidth={2}/>}
        {showFuture && <Bar dataKey="Future" fill="#828282"/>}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date" scale="time" domain={['dataMin', 'dataMax']} type="number" tickFormatter={formatDate} padding={{ right: 60, left: 60 }} />
        <YAxis width={80}/>
        <Tooltip labelFormatter={formatDate} formatter={roundValue}/>
        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  );

}


