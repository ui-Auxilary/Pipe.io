import json
import os
import plotly.graph_objects as go
import pandas as pd


def write_plot(x_axis: str, y_axis: str, filenames: str):
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