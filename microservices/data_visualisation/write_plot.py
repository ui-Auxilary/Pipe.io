import pandas as pd
import json
import plotly.graph_objects as go
import os

def write_plot(x_axis: str, y_axis: str, input_file_paths: str):
    """Plots the data from the csv file

    Args:
        x_axis (str): The column name for the x-axis
        y_axis (str): The column name for the y-axis
        input_file_paths (str): The name of the csv files comma separated

    Returns:
        str: JSON filename for plotly.graph_objects.Figure which is a
        plotly figure object within a HTML file that can be opened
    """
    
    # read all csv files in the direcotry
    directory = os.getcwd()
    files = os.listdir(directory)

    # remove whitespace
    csv_files = []
    input_file_paths = input_file_paths.replace(" ", "")
    input_file_paths = input_file_paths.split(",")

    for filename in input_file_paths:
        if filename in files:
            csv_files.append(filename)

    # read the csv files and plot
    file_names_ret = {}
    for file in csv_files:
        df = pd.read_csv(file)
        fig = go.Figure(data=go.Scatter(x=df[x_axis], y=df[y_axis]))
        fig.write_html(file[:-4] + ".html")
        file_names_ret[file[:-4]] = file[:-4] + ".html"

    return json.dumps(file_names_ret, indent=4)