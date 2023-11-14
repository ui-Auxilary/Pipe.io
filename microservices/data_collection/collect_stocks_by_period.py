import datetime
import yfinance as yf

def import_yahoo_by_period(ticker: str = 'msft',
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

    # Save the dataframe to our storage location
    df.to_csv(output_file_path)
    return df.to_json()