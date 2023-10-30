import pandas as pd
import os
import datetime
import yfinance as yf

# def import_csv(input_file_path: str = 'default.csv', output_file_path: str = 'stock_data.csv'):
#     """Imports data from a csv as a pandas dataframe

#     Args:
#         input_file_path (str, optional): path for the input csv. Defaults to 'default.csv'.
#         output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.

#     Returns:
#         pd.DataFrame: Dataframe from the csv file
#     """

#     df = pd.read_csv(input_file_path)
#     df.to_csv(output_file_path)
#     return df


def import_yahoo(ticker: str = 'msft',
                 output_file_path: str = 'stock_data.csv',
                 time_period: str = '1y'):
    """Imports market data from Yahoo using the yfinance Ticker API.

    Args:
        ticker (str, optional): The stock ticker symbol. Defaults to 'msft'.
        output_file_path (str, optional): The output file path. Defaults to 'stock_data.csv'.
        time_period (str, optional): The time period to import data for. Defaults to '1y'.

    Returns:
        pd.DataFrame: A dataframe containing the imported market data.
    """

    ticker = yf.Ticker(ticker)
    df = ticker.history(period=time_period)
    df['Datetime'] = df.index

    # Save the dataframe to our storage location
    df.to_csv(output_file_path)

    return df.to_json()