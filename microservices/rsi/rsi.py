import pandas as pd
import os
import datetime

def calculate_rsi(input_file_path:str = 'stock_data.csv', output_file_path:str = 'rsi.csv', window_size: int =5 , date_column: str = 'Date', value_column:str = 'Open'):
    """Calculate the Relative Strength Index (RSI) for a given dataset.

    Args:
        input_file_path (str): Input file path in CSV format.
        output_file_path (str): Output file path to save the results.
        window_size (int): Number of days to use for RSI calculation.
        date_column (str): Column name for dates.
        value_column (str): Column name for price or value.

    Returns:
        pd.DataFrame: Dataframe with RSI values.
    """
    # Read the input CSV file
    input_file_path = os.path.join('/backend/data/', input_file_path)
    df = pd.read_csv(input_file_path)
    df[date_column] = pd.to_datetime(df[date_column])
    df = df.sort_values(by=[date_column])

    # Calculate daily price changes
    df['Price Change'] = df[value_column].diff()

    # Separate gains and losses
    df['Gain'] = df['Price Change'].where(df['Price Change'] > 0, 0)
    df['Loss'] = -df['Price Change'].where(df['Price Change'] < 0, 0)

    # Calculate average gains and average losses over the specified window
    df['Average Gain'] = df['Gain'].rolling(window=window_size).mean()
    df['Average Loss'] = df['Loss'].rolling(window=window_size).mean()

    # Calculate Relative Strength (RS)
    df['RS'] = df['Average Gain'] / df['Average Loss']

    # Calculate RSI
    df['RSI'] = 100 - (100 / (1 + df['RS']))

    # Save the dataframe to the output file path
    df.to_csv(output_file_path)

    return df.to_json()
