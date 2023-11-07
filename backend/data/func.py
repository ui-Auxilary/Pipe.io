import pandas as pd
import datetime
from yfinance import Ticker as si

'''
Guidelines for building microservices (python functions):

1. Create a python function
2. Make sure the function has a docstring that explain to user how to use the microservice, and what the service does
3. Make sure the function has a return statement
4. Make sure the function has a parameter
5. Make sure the function has a default value for the parameter
6. Make sure the function has a type hint for the parameter 

'''


def import_marketdata_yahoo_csv(ticker: str = 'msft', 
                                start_date: str = (datetime.datetime.now() - datetime.timedelta(days=365)).strftime("%Y-%m-%d"),
                                end_date: str = datetime.datetime.now().strftime("%Y-%m-%d"), 
                                output_file_path: str = 'yfinance_ohlc.csv' ):
    """
    Imports market data from Yahoo using the yfinance Ticker API.
    
    Parameters:
    - ticker (str): The stock ticker symbol. Default is 'msft'.
    - start_date (str): The start date for the data in 'YYYY-MM-DD' format. Default is one year ago from today.
    - end_date (str): The end date for the data in 'YYYY-MM-DD' format. Default is today.
    - output_file_path (str): The path to save the resulting CSV file. Default is 'yfinance_ohlc.csv'.
    
    Returns:
    - pd.DataFrame: A dataframe containing the imported market data.
    """

    # Fetch the market data using the yfinance Ticker
    df = si(ticker).history(start=start_date, end=end_date)
    df['Datetime'] = df.index

    # Save the dataframe to a CSV file
    df.to_csv(output_file_path)

    return df

def calculate_moving_average(window: int = 20, 
                             column: str = 'Close',
                             input_file_path: str = 'yfinance_ohlc.csv',
                             output_file_path: str = 'yfinance_ohlc_ma.csv'):
    """
    Calculates the moving average for the 'Close' column from a given CSV file.
    
    Parameters:
    - window (int): The window size for the moving average calculation. Default is 20.
    - input_file_path (str): The path to the input CSV file. Default is 'yfinance_ohlc.csv'.
    - output_file_path (str): The path to save the resulting CSV file with moving average. Default is 'yfinance_ohlc_ma.csv'.
    
    Returns:
    - pd.DataFrame: A dataframe containing the original data and the calculated moving average.
    """

    # Load the CSV into a dataframe
    df = pd.read_csv(input_file_path)

    # Calculate the moving average for the 'Close' column
    df['MA'] = df[column].rolling(window=window).mean()

    # Save the dataframe with the moving average to a CSV file
    df.to_csv(output_file_path)

    return df
