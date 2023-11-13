import pandas as pd
import os
import datetime
import yfinance as yf
import json
import plotly.graph_objects as go

def import_yahoo(ticker: str = 'msft',
                 start_date: str = (datetime.datetime.now(
                 ) - datetime.timedelta(days=365)).strftime("%Y-%m-%d"),
                 end_date: str = datetime.datetime.now().strftime("%Y-%m-%d"),
                 output_file_path: str = 'stock_data.csv'):
    """Imports market data from Yahoo using the yfinance Ticker API.

    Args:
        ticker (str, optional): The stock ticker symbol. Defaults to 'msft'.
        output_file_path (str, optional): The output file path. Defaults to 'stock_data.csv'.
        time_period (str, optional): The time period to import data for. Defaults to '1y'.

    Returns:
        pd.DataFrame: A dataframe containing the imported market data.
    """
    ticker = yf.Ticker(ticker)

    df = ticker.history(start=start_date, end=end_date, interval="1d")

    # Save the dataframe to our storage location
    df.to_csv(output_file_path)

    return df.to_json()


def plot_data(x_axis: str, y_axis: str, filenames: str):
    """Plots the data from the csv file

    Args:
        x_axis (str): The column name for the x-axis
        y_axis (str): The column name for the y-axis
        filenames (str): The name of the csv files comma separated

    Returns:
        plotly.graph_objects.Figure: A plotly figure object
    """
    
    directory = os.getcwd()

    # read all csv files in the direcotry
    files = os.listdir(directory)

    
    csv_files = []


    #remove white space
    filenames = filenames.replace(" ", "")
    filenames = filenames.split(",")



    for filename in filenames:
        if filename in files:
            csv_files.append(filename)

    file_names_ret = {}

    # read the csv files and plot
    for file in csv_files:
        df = pd.read_csv(file)
        fig = go.Figure(data=go.Scatter(x=df[x_axis], y=df[y_axis]))
        fig.write_html(file[:-4] + ".html")
        file_names_ret[file[:-4]] = file[:-4] + ".html"
       

    return json.dumps(file_names_ret, indent=4)

