import { format } from "date-fns";
import { StockInterface } from "types/VisualizationTypes";

// round to 2 decimal places
export const roundPrice = (showMFI:boolean, showVolume: boolean, showRSI: boolean, showMovingAverage: boolean, price: number, stock: any) => {

  if (showVolume && stock.find((el: { Volume: number; }) => el.Volume == price)) {
    return price;
  }

  if (showRSI && stock.find((el: { RSI: number; }) => el.RSI == price)) {
    return Math.round(price*100)/ 100 + '%';
  }

  if (showMovingAverage && stock.find((el: { moving_average: number; }) => el.moving_average == price)) {
    if (price > 303100) {
      return price;
    }
  }

  if (showMFI && stock.find((el: { MFI: number; }) => el.MFI == price)) {
    return Math.round(price*100)/ 100 + '%';
  }

  const priceNew = Math.round(price * 100) / 100;

  return "$" + priceNew.toString() + " USD";
}


export const formatDate = (date: string) => {
  if (!date) {
    return "";
  }
  return format(new Date(date), "dd/MM/yy");
}


const isMovingAverage = (stock: StockInterface[]) => {
  if (stock[0] && stock[stock.length -1]["Moving Average"] != undefined) {
    return true;
  }
}

const isRSI = (stock: StockInterface[]) => {
  if (stock[0] && stock[stock.length -1].RSI != undefined) {
    return true;
  }
}

const isOpen = (stock: StockInterface[]) => {
  if (stock[0] && stock[0].Open != undefined) {
    return true;
  }
}

const isHigh = (stock: StockInterface[]) => {
  if (stock[0] && stock[0].High != undefined) {
    return true;
  }
}

const isLow = (stock: StockInterface[]) => {
  if (stock[0] && stock[0].Low != undefined) {
    return true;
  }
}

const isVolume = (stock: StockInterface[]) => {
  if (stock[0] && stock[0].Volume != undefined) {
    return true;
  }
}

const isClose = (stock: StockInterface[]) => {
  if (stock[0] && stock[0].Close != undefined) {
    return true;
  }
}

const isFuture = (stock: StockInterface[]) => {
  if (stock[0] && stock[stock.length -1].Future != undefined) {
    return true;
  }
}

const isMFI = (stock: StockInterface[]) => {
  if (stock[0] && stock[stock.length-1].MFI != undefined) {
    return true;
  }
}

export { isMovingAverage, isRSI, isOpen, isHigh, isLow, isVolume, isClose, isFuture, isMFI };