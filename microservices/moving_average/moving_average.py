import pandas as pd
import os
import datetime
def moving_avergae(input_file_path: str = 'stock_data.csv', output_file_path:str = 'moving_average.csv', window_size: int = 5, date_column:str = 'Date', value_column:str = 'Volume'):
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
    
    input_file_path = os.path.join('/backend/data/', input_file_path)
    df = pd.read_csv(input_file_path)
    df = df.sort_values(by=[date_column])
    data_type = df[value_column].dtype
    if data_type == 'object':
        df[value_column] = df[value_column].str.replace(',', '').astype(float)
    df['moving_average'] = df[value_column].rolling(window=window_size).mean()
    df.to_csv(output_file_path)
    return df.to_json()