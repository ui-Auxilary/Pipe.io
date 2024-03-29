import pandas as pd
import yfinance as yf

def import_yahoo_by_period(ticker: str = 'msft',
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

def table_drop_columns(input_file_path: str = 'stock_data.csv', output_file_path: str = 'stock_data_dropped.csv', columns: str = 'Dividends,Stock Splits,Datetime'):
    """Drops specified columns from csv

    Args:
        input_file_path (str, optional): path for the input csv. Defaults to 'stock_data.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.
        columns (str, optional): comma seperated column names to be dropped. Defaults to ''.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    df = pd.read_csv(input_file_path, index_col=0)
    column_list = [s.strip() for s in columns.split(',')]

    for column in column_list:
        try:
            df = df.drop(columns=[column])
        except KeyError:
            return "Error"
            raise ValueError("Column(s) not found")
    
    df.to_csv(output_file_path)
    return df.to_json()

def table_drop_columns_again(input_file_path: str = 'stock_data.csv', output_file_path: str = 'stock_data_dropped_2.csv', columns: str = 'Open,High,Low,Close,Volume'):
    """Drops specified columns from csv

    Args:
        input_file_path (str, optional): path for the input csv. Defaults to 'stock_data.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.
        columns (str, optional): comma seperated column names to be dropped. Defaults to ''.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    df = pd.read_csv(input_file_path, index_col=0)
    column_list = [s.strip() for s in columns.split(',')]

    for column in column_list:
        try:
            df = df.drop(columns=[column])
        except KeyError:
            return "Error"
            raise ValueError("Column(s) not found")
    
    df.to_csv(output_file_path)
    return df.to_json()

def zmerge_csv(input_file_path_1: str = 'stock_data_dropped.csv', input_file_path_2: str = 'stock_data_dropped_2.csv', output_file_path: str = 'stock_data_updated.csv', how: str = 'inner', left_on: str ='Date', right_on: str ='Date'):
    """Merges csv using pandas.DataFrame.merge

    Args:
        input_file_path_1 (str, optional): path for the first input csv. Defaults to 'stock_data.csv'.
        input_file_path_2 (str, optional): path for the second input csv. Defaults to 'stock_data_2.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.
        how (str, optional): Type of merge, as defined by df.merge. Defaults to 'inner'.
        left_on (str, optional): left key of merge, as defined by df.merge. Defaults to 'Date'.
        right_on (str, optional): right key of merge, as defined by df.merge. Defaults to 'Date'.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    df1 = pd.read_csv(input_file_path_1, index_col=0)
    df2 = pd.read_csv(input_file_path_2, index_col=0)
    
    try:
        df3 = df1.merge(df2, left_on = left_on, right_on = right_on)
    except KeyError:
        raise ValueError("Column(s) not found")

    df3.to_csv(output_file_path)
    return df3.to_json()