import pandas as pd
import os
import datetime
import yfinance as yf
import json
import plotly


def import_csv(input_file_path: str = 'default.csv', output_file_path: str = 'stock_data.csv'):
    """Imports data from a csv as a pandas dataframe

    Args:
        input_file_path (str, optional): path for the input csv. Defaults to 'default.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """

    input_file_path = os.path.join('/backend/data/', input_file_path)

    df = pd.read_csv(input_file_path)
    df.to_csv(output_file_path)
    return df.to_json()


def import_yahoo(ticker: str = 'msft',
                 start_date: str = (datetime.datetime.now(
                 ) - datetime.timedelta(days=365)).strftime("%Y-%m-%d"),
                 end_date: str = datetime.datetime.now().strftime("%Y-%m-%d"),
                 output_file_path: str = 'stock_data.csv'):
    """Imports market data from Yahoo using the yfinance Ticker API.

    Args:
        ticker (str, optional): The stock ticker symbol. Defaults to 'msft'.
        start_date (str, optional): The start date for the data in 'YYYY-MM-DD' format. Defaults to one year ago from today.
        end_date (str, optional): The end date for the data in 'YYYY-MM-DD' format. Defaults to today.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.

    Returns:
        pd.DataFrame: A dataframe containing the imported market data.
    """
    ticker = yf.Ticker(ticker)

    df = ticker.history(start=start_date, end=end_date, interval="1d")
    # df['Date'] = df.index

    # Save the dataframe to our storage location
    df.to_csv(output_file_path)

    ret = df.reset_index().to_dict(orient='list')

    # fix timestamp
    ret['Date'] = [str(x.strftime("%Y-%m-%d")) for x in ret['Date']]

    return ret


