import { format } from "date-fns";
import { StockInterface } from "types/VisualizationTypes";

// round to 2 decimal places
export const roundPrice = (showMFI:boolean, showVolume: boolean, showRSI: boolean, showMovingAverage: boolean, price: number, stock: StockInterface[]) => {

  if (showVolume && stock.find((el) => el.Volume == price)) {
    return price;
  }

  if (showRSI && stock.find((el) => el.RSI == price)) {
    return Math.round(price*100)/ 100 + '%';
  }

  if (showMovingAverage && stock.find((el) => el["Moving Average"] == price)) {
    if (price > 303100) {
      return price;
    }
  }

  if (showMFI && stock.find((el) => el.MFI == price)) {
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
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i]["Moving Average"] != undefined) {
        return true;
      }
    }
  }
  return false;
}

const isRSI = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].RSI != undefined) {
        return true;
      }
    }
  }
  return false;
}

const isOpen = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].Open != undefined) {
        return true;
      }
    }
  }
  return false;
}

const isHigh = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].High != undefined) {
        return true;
      }
    }
  }
  return false;
}

const isLow = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].Low != undefined) {
        return true;
      }
    }
  }
}

const isVolume = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].Volume != undefined) {
        return true;
      }
    }
  }
}

const isClose = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].Close != undefined) {
        return true;
      }
    }
  }
}

const isFuture = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].Future != undefined) {
        return true;
      }
    }
  }
}

const isMFI = (stock: StockInterface[]) => {
  if (stock[0]) {
    for (let i = 0; i < stock.length; i++) {
      if (stock[i].MFI != undefined) {
        return true;
      }
    }
  }
}

export { isMovingAverage, isRSI, isOpen, isHigh, isLow, isVolume, isClose, isFuture, isMFI };