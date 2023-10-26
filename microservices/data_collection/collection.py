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
    df[0] = df.index
    # Save the dataframe to our storage location
    df.to_csv(output_file_path)

    return df.to_json()


def plot_data(x_axis: str, y_axis: str):
    """Plots the data from the csv file

    Args:
        x_axis (str): The column name for the x-axis
        y_axis (str): The column name for the y-axis

    Returns:
        plotly.graph_objects.Figure: A plotly figure object
    """
    
    directory = os.getcwd()

    # read all csv files in the direcotry
    files = os.listdir(directory)
    csv_files = [file for file in files if file.endswith(".csv")]
    file_names = {}

    # read the csv files and plot
    for file in csv_files:
        df = pd.read_csv(file)
        fig = plotly.graph_objects.Figure(data=plotly.graph_objects.Scatter(x=df[x_axis], y=df[y_axis]))
        # plotly.offline.plot(fig, filename=file[:-4] + ".html")
        html_code = plotly.offline.plot(fig, include_plotlyjs=True, output_type='div')
        file_names[file[:-4]] = html_code

    return json.dumps(file_names, indent=4)
