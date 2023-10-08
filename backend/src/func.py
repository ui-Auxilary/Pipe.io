import pandas as pd
from pymongo import MongoClient
import datetime
import yfinance as yf

def import_csv(input_file_path: str = 'default.csv'):
    """
    Imports data from a csv as a pandas dataframe

    Parameters:
    - input_file_path (str): the path for the inputted csv. Defauly is 'default.csv'

    Returns
    - pd.DataFrame: A dataframe from the csv file
    """
    df = pd.read_csv(input_file_path)

    df.to_csv('/data/stock.csv')

    return df

def import_yahoo(ticker: str = 'msft', 
                                start_date: str = (datetime.datetime.now() - datetime.timedelta(days=365)).strftime("%Y-%m-%d"),
                                end_date: str = datetime.datetime.now().strftime("%Y-%m-%d")):
    """
    Imports market data from Yahoo using the yfinance Ticker API.
    
    Parameters:
    - ticker (str): The stock ticker symbol. Default is 'msft'.
    - start_date (str): The start date for the data in 'YYYY-MM-DD' format. Default is one year ago from today.
    - end_date (str): The end date for the data in 'YYYY-MM-DD' format. Default is today.
    
    Returns:
    - pd.DataFrame: A dataframe containing the imported market data.
    """

    ticker = yf.Ticker(ticker)
    df = ticker.history(start=start_date, end=end_date, index_as_date = True, interval="1d")
    df['Datetime'] = df.index
    
    # Save the dataframe to our storage location
    df.to_csv('/data/stock.csv')

    return df