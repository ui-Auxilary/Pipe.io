import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area} from 'recharts';
import { formatDate, roundPrice } from './chartHelper';
import { ChartProps } from 'types/VisualizationTypes';


export default function AreaChartComponent(props: ChartProps) {
  const {stock, showClose, showOpen, showHigh, showLow, showVolume, showMovingAverage, showRSI, showFuture} = props.chartData;

  const roundValue = (price: number) => {
    return roundPrice(showVolume, showRSI, showMovingAverage, price, stock);
  }

  return(
    <ResponsiveContainer width="95%" height={"90%"}>
      <AreaChart data={stock}>
        {showClose && <Area type="monotone" dataKey="Close" stroke="#02b2af" fill="#02b2af" strokeWidth={2}/>}
        {showOpen && <Area type="monotone" dataKey="Open" stroke="#8884d8" fill="#8884d8" strokeWidth={2}/>}
        {showHigh && <Area type="monotone" dataKey="High" stroke="#82ca9d" fill="#82ca9d" strokeWidth={2}/>}
        {showLow && <Area type="monotone" dataKey="Low" stroke="#ffc658" fill="#ffc658" strokeWidth={2}/>}
        {showVolume && <Area type="monotone" dataKey="Volume" stroke="#ff0000" fill="#ff0000" strokeWidth={2}/> } 
        {showMovingAverage && <Area type="monotone" dataKey="moving_average" stroke="#0000ff" fill="#0000ff" strokeWidth={2}/>}
        {showRSI && <Area type="monotone" dataKey="RSI" stroke="#000000" fill="#000000" strokeWidth={2}/>}
        {showFuture && <Area type="monotone" dataKey="Future" stroke="#828282" fill="#000000" strokeWidth={2}/>}

        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date" scale="time" domain={['dataMin', 'dataMax']} type="number" tickFormatter={formatDate} />
        <YAxis width={80}/>
        <Tooltip labelFormatter={formatDate} formatter={roundValue}/>
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}





