import pandas as pd
import os
import datetime

def moving_average(input_file_path: str = 'stock_data.csv', output_file_path:str = 'moving_average.csv', window_size: int = 5, date_column:str = 'Date', value_column:str = 'Volume'):

    """get csv file path, output file path and window size

    Args:
        input_file_path (str): input file path
        output_file_path (str): output file path
        window_size (num): the window size of moving average
        date_column (str): the colunm name of the date column in the input file
        value_column (str): the colunm name of the value column in the output file
    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    
    if not input_file_path.lower().endswith('.csv') or not output_file_path.lower().endswith('.csv'):
        raise ValueError("Input and output file paths must have .csv extension")
    
    if not os.path.exists(input_file_path):
        raise FileNotFoundError(f"Input file not found: {input_file_path}")

    df = pd.read_csv(input_file_path)
    
    if date_column not in df.columns or value_column not in df.columns:
        raise ValueError(f"Columns {date_column} and {value_column} must exist in the input dataframe")
    
    if not isinstance(window_size, int):
        raise ValueError("Window size must be an integer")
    if window_size > len(df):
        raise ValueError("Window size cannot be greater than the number of rows in the dataframe")
    df = df.sort_values(by=[date_column])
    df['Moving Average'] = df[value_column].rolling(window=window_size).mean()
    df.to_csv(output_file_path)
    return df.to_json()
