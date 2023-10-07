import yfinance as yf
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

UPWEIGHT = 1.5
DOWNWEIGHT = 0.7

def _get_news_titles_by_company(company):
    """ Gets the titles of relevant news articles for the given company

    Args:
        company (str): Financial code for the company

    Returns:
        list[str]: List of titles of relevant news articles
    """
    ticker = yf.Ticker(company)
    return ticker, [article['title'] for article in ticker.news]

def _calculate_overall_sentiment(titles, transform):
    """ Calculates the overall sentiment of a company

    Args:
        titles (list[str]): List of titles of relevant news articles
        transform (func(list[int])): Function to transform sentiment scores for
        each title into a single score

    Returns:
        int: Integer value of the overall sentiment
    """
    sentiment_analyser = SentimentIntensityAnalyzer()
    sentiments = [sentiment_analyser.polarity_scores(title) for title in titles]
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

def sentiment_analysis_microservice(stock='MSFT', transform='mean'):
    """ Calculates the sentiment of a company based on the news articles associated
    with it on the yfinance Ticker.news API

    Args:
        stock (str, optional): Stock ticker symbol
        (such as 'MSFT' for Microsoft). Defaults to 'MSFT'.
        transform (str, optional): transformation function to take
        individual article sentiment and convert it to a single value.
        Can be `mean` for simplicity or `weighted_mean` to upweight positive
        sentiments. Defaults to 'mean'.

    Raises:
        ValueError: When an invalid stock is provided

    Returns:
        int: Integer value of the overall sentiment of the company
    """
    nltk.download('vader_lexicon')
    ticker, titles = _get_news_titles_by_company(stock)
    transform = _determine_which_transform_to_use(transform)

    if len(ticker.history()) == 0:
        raise ValueError('Invalid stock provided')

    return _calculate_overall_sentiment(titles, transform)

if __name__ == '__main__':
    print(sentiment_analysis_microservice('INTC', 'weighted_mean'))