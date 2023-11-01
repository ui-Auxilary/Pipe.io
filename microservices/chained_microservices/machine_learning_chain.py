import yfinance as yf

import nltk
import nltk.sentiment

import pandas as pd
import tensorflow as tf
import numpy as np
import json
import plotly.graph_objects as go
import os

# DEFAULT CONSTANTS
EXTRAPOLATE_DAYS = 200
DAYS_TO_TAKE_FROM_EACH_PREDICTION = 10

# MODEL CONSTANTS
WINDOW_SIZE = 100
UPWEIGHT = 1.5
DOWNWEIGHT = 0.7

def gather_news_title_data_for_stock(stock: str = 'msft', output_file_path: str = 'news_data.csv'):
    """Gets the titles of relevant news articles for the given company

    Args:
        stock (str): Financial code for the company. Defaults to 'msft'.
        output_file_path (str): path for the output csv. Defaults to 'news_data.csv'.

    Returns:
        list[str]: List of titles of relevant news articles
    """
    # load the stock and get the news
    ticker = yf.Ticker(stock)
    news_data = ticker.news
    
    # check if the stock is valid
    if len(ticker.history()) == 0:
        raise ValueError('Invalid stock provided')

    # we only want the titles because that is accurate and reliable for news analysis
    news_data = [article['title'] for article in news_data]

    # save the data for later use by other microservices
    news_df = pd.DataFrame(news_data)
    news_df.to_csv(output_file_path, header=False, index=False)

    # display the news data as a json for users to see
    return news_df.to_json()

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


def sentiment_analysis_microservice(input_file_path: str = 'news_data.csv', transform='mean', output_file_path: str = 'sentiment_data.csv'):
    """ Calculates the sentiment of a company based on the news articles associated
    with it on the yfinance Ticker.news API

    Args:
        input_file_path (str, optional): path for the input csv.
        Defaults to 'news_data.csv'.
        transform (str, optional): transformation function to take
        individual article sentiment and convert it to a single value.
        Can be `mean` for simplicity or `weighted_mean` to upweight positive
        sentiments. Defaults to 'mean'.

    Returns:
        int: Integer value of the overall sentiment of the company
    """
    # load the news data from input_file_path csv
    titles = pd.read_csv(input_file_path, header=None)[0].tolist()
    
    # determine which transform function to use
    transform_function = _determine_which_transform_to_use(transform)

    # calculate the sentiment value
    sentiment_value = _calculate_overall_sentiment(titles, transform_function)
    
    # output to output_file_path as a number
    with open(output_file_path, 'w') as f:
        f.write(str(sentiment_value))
    
    return _sentiment_value_to_analysed_value(sentiment_value, transform)

def time_prediction_future_stock_values(stock_input_file_path: str = 'stock_data.csv', sentiment_input_file_path: str = 'sentiment_data.csv', number_of_days_to_predict: int = EXTRAPOLATE_DAYS, days_from_each_prediction: int = DAYS_TO_TAKE_FROM_EACH_PREDICTION, prepend_stock_data: bool = False):
    
    """ Predicts the future values of a stock based on a model trained on historical data.
    
    Args:
        stock_input_file_path (str): Path to the stock data csv file.
        sentiment_input_file_path (str): Path to a file with a sentiment float value.
        number_of_days_to_predict (int): Number of future days to predict.
        days_from_each_prediction (int): Number of days from each prediction used for the next prediction (do not change unless you know what you are doing).
        prepend_stock_data (bool): Whether past stock data will be prepended to the predictions. If False, only future predictions will be generated.

    Returns:
        : _description_
    """

    model = _load_model()

    # load stock dataframe
    stock_df = pd.read_csv(stock_input_file_path)

    # load sentiment value
    with open(sentiment_input_file_path) as f:
        sentiment_value = float(f.readline())

    last_window = np.array(stock_df.Close)[-WINDOW_SIZE:]
    complete_predictions = np.array([])
    while len(complete_predictions) < EXTRAPOLATE_DAYS:
        prediction = model.predict(np.array([np.append(last_window, sentiment_value)]))
        complete_predictions = np.concatenate((complete_predictions, prediction[0]))
        last_window = np.concatenate((last_window[DAYS_TO_TAKE_FROM_EACH_PREDICTION:], prediction[0]))
    
    model_completed_predictions = np.array(list(stock_df.Close) + list(complete_predictions))
    return_predictions = model_completed_predictions if prepend_stock_data else model_completed_predictions[-EXTRAPOLATE_DAYS:]
    
    df = pd.DataFrame(return_predictions)

    df.reset_index(inplace=True)
    df=df.set_axis(["Date","Close"], axis=1)

    start_date = stock_df["Datetime"].iloc[-1]
    date_range = pd.date_range(start_date, periods=len(df))
    df["Date"] = date_range

    df.to_csv("output.csv", header=True)

    return df.to_json()


def wrtie_plot(x_axis: str, y_axis: str, filenames: str):
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



# helper functions

def _calculate_overall_sentiment(titles, transform):
    """ Calculates the overall sentiment of a company

    Args:
        titles (list[str]): List of titles of relevant news articles
        transform (func(list[int])): Function to transform sentiment scores for
        each title into a single score

    Returns:
        int: Integer value of the overall sentiment
    """
    sentiment_analyser = nltk.sentiment.SentimentIntensityAnalyzer()
    sentiments = [sentiment_analyser.polarity_scores(
        title) for title in titles]
    return transform(sentiments)


def _mean_transform(sentiments):
    """ Transforms a list of sentiments into the mean

    Args:
        sentiments (list[dict[str:int]]): List with sentiment values for each news article

    Returns:
        int: Integer value of the mean sentiment
    """
    return sum([sentiment['compound'] for sentiment in sentiments]) / len(sentiments)


def _weighted_mean_transform(sentiments):
    """ Transforms a list of sentiments into a weighted mean where positive sentiments
    are upweighted and negative sentiments are downweighted

    Args:
        sentiments (list[dict[str:int]]): List with sentiment values for each news article

    Returns:
        int: Integer value of the combined sentiment with a weighted mean
    """

    return sum([sentiment['pos'] * UPWEIGHT + sentiment['neg'] * DOWNWEIGHT for sentiment in sentiments]) / len(sentiments)


def _determine_which_transform_to_use(transform_name):
    """Returns a transform function based on the transform name provided

    Args:
        transform_name (str): transform name for the transformation required

    Raises:
        ValueError: If transform_name not in {'mean', 'weighted_mean'}

    Returns:
        func(list[dict[str:int]]): transform function
    """
    if transform_name == 'mean':
        return _mean_transform
    elif transform_name == 'weighted_mean':
        return _weighted_mean_transform
    else:
        raise ValueError('Invalid transform provided')

def _sentiment_value_to_analysed_value(sentiment_value, transform):
    """Converts the sentiment value to whether it is a buy or sell sentiment

    Args:
        sentiment_value (float): sentiment value
        transform (str): transform function used to resolve individual news sentiments

    Returns:
        str: description of the stock sentiment
    """
    if sentiment_value > 0.15:
        sentiment = 'very positive'
    elif sentiment_value > 0:
        sentiment = 'positive'
    elif sentiment_value == 0:
        sentiment = 'neutral'
    elif sentiment_value > -0.15:
        sentiment = 'negative'
    else:
        sentiment = 'very negative'
    return f'The sentiment of the stock is {sentiment} with a score of {sentiment_value:.2f} using the {transform} function for each news article.'

def _load_model():
    return tf.keras.models.load_model('../additional_required_modules/stock_predictor.h5')


if __name__ == '__main__':
    print(sentiment_analysis_microservice())
