import yfinance as yf
import nltk
import nltk.sentiment
import pandas as pd

UPWEIGHT = 1.5
DOWNWEIGHT = 0.7

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

if __name__ == '__main__':
    print(sentiment_analysis_microservice())
