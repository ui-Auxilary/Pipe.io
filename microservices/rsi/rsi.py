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
