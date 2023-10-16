import pandas as pd
import os
import datetime
def import_csv(input_file_path, output_file_path, window_size, date_column, value_column):
    """get csv file path, output file path and window size

    Args:
        input_file_path (str): input file path
        output_file_path (str): output file path
        window_size (num): days from now to (now-num) days
        date_column (str): date column
        value_column (str): value column
    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    
    df = pd.read_csv(input_file_path)
    df[date_column] = pd.to_datetime(df[date_column])
    df = df.sort_values(by=[date_column])
    df['moving_average'] = df[value_column].rolling(window=window_size).mean()
    df.to_csv(output_file_path)
    return df
    
    