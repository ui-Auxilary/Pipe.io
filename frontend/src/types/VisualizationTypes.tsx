import { ReactNode } from "react";

export interface ChartData {
  stock: StockInterface[];
  showClose: boolean;
  showOpen: boolean;
  showHigh: boolean;
  showLow: boolean;
  showVolume: boolean;
  showMovingAverage: boolean;
  showRSI: boolean;
  }
  
export interface ChartProps {
  chartData: ChartData;
}

export interface ChartComponentProps {
  pipeId: string;
  name: string;
  index: number;
  children?: ReactNode;

}

export interface StockInterface {
  Date: string;
  Open?: number;
  High?: number;
  Low?: number;
  Close?: number;
  Volume?: number;
  moving_average?: number;
  RSI?: number;
}