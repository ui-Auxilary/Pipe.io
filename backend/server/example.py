import yfinance as yf
from datetime import datetime, timedelta
import pandas as pd
import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
stock_data = yf.Ticker("aapl")
stock_data = stock_data.history()
stock_data = pd.DataFrame(stock_data)
stock_data['stock_name'] = "AAPL"
stock_data = stock_data.reset_index()
time_list = stock_data['Date'].tolist()
def SimpleCharts():
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
  )


export default SimpleCharts;
print(time_list)