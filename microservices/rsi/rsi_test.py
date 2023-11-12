import pandas as pd
import os
import pytest
from rsi import calculate_rsi
@pytest.fixture
def test_rsi():

    sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05'],
        'Open': [100, 200, 300, 400, 500]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data.csv')
    calculate_rsi('sample_stock_data.csv', 'sample_rsi.csv', 3, "Date", "Open")
    output_df = pd.read_csv('sample_rsi.csv')
    assert('RSI' in output_df.columns)
    assert (output_df['RSI'].tolist() == [None, None, 100, 100, 100])
    os.remove('sample_stock_data.csv')
    os.remove('sample_rsi.csv')
def test_rsi2():
    
    sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05'],
        'Open': [100, 150, 200, 250, 300]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data.csv')
    calculate_rsi('sample_stock_data.csv', 'sample_rsi.csv', 1, "Date", "Open")
    output_df = pd.read_csv('sample_rsi.csv')
    assert('RSI' in output_df.columns)
    assert (output_df['RSI'].tolist() == [None, 100, 100, 100, 100])
    os.remove('sample_stock_data.csv')
    os.remove('sample_rsi.csv')
def test_invalid_file_extension():
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path='invalid_input.txt', output_file_path='invalid_output.txt', window_size=3, date_column='Date', value_column='Open')
    assert str(exc_info.value) == "Input and output file paths must have .csv extension"  
def test_nonexistent_file():
    with pytest.raises(FileNotFoundError) as exc_info:
        calculate_rsi(input_file_path='nonexistent_file.csv', output_file_path='nonexistent_output.csv', window_size=3, date_column='Date', value_column='Open')
    assert str(exc_info.value) == f"Input file not found: nonexistent_file.csv"
def test_missing_columns():
    # Test the function with missing columns in the input dataframe
    input_file_path, output_file_path = "stock_data.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path=input_file_path, output_file_path=output_file_path, window_size=3, date_column='Date', value_column='InvalidColumn')
    assert str(exc_info.value) == "InvalidColumn" 
def test_non_integer_window_size():
    # Test the function with a non-integer window size
    input_file_path, output_file_path = "stock_data.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path=input_file_path, output_file_path=output_file_path, window_size=3.5, date_column='Date', value_column='Open')
    assert str(exc_info.value) == "Window size must be an integer"
def test_large_window_size():
    # Test the function with a window size larger than the number of rows
    input_file_path, output_file_path = "stock_data.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path=input_file_path, output_file_path=output_file_path, window_size=100, date_column='Date', value_column='Open')
    assert str(exc_info.value) == "Window size cannot be greater than the number of rows in the dataframe"
def test_string_window_size():
    input_file_path, output_file_path = "stock_data.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path=input_file_path, output_file_path=output_file_path, window_size="Hello", date_column='Date', value_column='Volume')
    assert str(exc_info.value) == "Window size must be an integer"
