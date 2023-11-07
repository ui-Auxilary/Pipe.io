import pandas as pd
import yfinance as yf

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

if __name__ == "__main__":
    print(gather_news_title_data_for_stock())