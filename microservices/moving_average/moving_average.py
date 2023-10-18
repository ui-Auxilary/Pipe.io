import pandas as pd
import os
import datetime
def moving_avergae(input_file_path, output_file_path, window_size, date_column, value_column):
    """get csv file path, output file path and window size

    Args:
        input_file_path (str): input file path
        output_file_path (str): output file path
        window_size (num): the window size of moving average
        date_column (str): date column
        value_column (str): value column
    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    
    df = pd.read_csv(input_file_path)
    df = df.sort_values(by=[date_column])
    #df['Volume'] = df['Volume'].str.replace(',', '').astype(float)  # Remove commas and convert to float
    data_type = df[value_column].dtype
    if data_type == 'object':
        df[value_column] = df[value_column].str.replace(',', '').astype(float)
    df['moving_average'] = df[value_column].rolling(window=window_size).mean()
    df.to_csv(output_file_path, index=False)
    return df
    
moving_avergae("microservices/moving_average/stock_data.csv", "microservices/moving_average/mv.csv", 5, "Date", "Open")
