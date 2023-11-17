import pandas as pd
import os
import pytest
from rsi import calculate_rsi
import numpy as np
sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', 
                 '2023-11-04', '2023-11-05'],
        'Open': [100, 200, 300, 400, 500]
    }
sample_df = pd.DataFrame(sample_data)
sample_df.to_csv('sample_stock_data.csv')
def test_rsi():
    calculate_rsi('sample_stock_data.csv', 'sample_rsi.csv', 3, "Date", "Open")
    output_df = pd.read_csv('sample_rsi.csv')
    assert('RSI' in output_df.columns)
    expected_values = [np.nan, np.nan, 100.0, 100.0, 100.0]
    np.testing.assert_allclose(output_df['RSI'].tolist(), expected_values, equal_nan=True)
def test_rsi2():
    
    sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05'],
        'Open': [22, 44, 33, 88, 77]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data2.csv')
    calculate_rsi('sample_stock_data2.csv', 'sample_rsi2.csv', 2, "Date", "Open")
    output_df = pd.read_csv('sample_rsi2.csv')
    assert('RSI' in output_df.columns)
    expected_values = [np.nan, 100.0, 66.66666666666666, 83.33333333333333, 83.33333333333333]
    np.testing.assert_allclose(output_df['RSI'].tolist(), expected_values, equal_nan=True)
def test_rsi3():
    
    sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05', '2023-11-06', '2023-11-07'],
        'Open': [10, 58, 33, 62, 77, 108, 19]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data3.csv')
    calculate_rsi('sample_stock_data3.csv', 'sample_rsi3.csv', 2, "Date", "Open")
    output_df = pd.read_csv('sample_rsi3.csv')
    assert('RSI' in output_df.columns)
    expected_values = [np.nan, 100.0, 65.753425, 53.703704, 100.0, 100.0, 25.833333]
    np.testing.assert_allclose(output_df['RSI'].tolist(), expected_values, equal_nan=True)
def test_invalid_file_extension():
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi('invalid_input.txt','invalid_output.txt', 3, 'Date', 'Volume')
    assert str(exc_info.value) == "Input and output file paths must have .csv extension"


def test_nonexistent_file():
    with pytest.raises(FileNotFoundError) as exc_info:
        calculate_rsi('nonexistent_file.csv', 'nonexistent_output.csv', 3, 'Date', 'Open')
    assert str(exc_info.value) == f"Input file not found: nonexistent_file.csv"


def test_missing_columns():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path, output_file_path, 3, 'Date', 'InvalidColumn')
    assert str(exc_info.value) == "Columns Date and InvalidColumn must exist in the input dataframe"


def test_non_integer_window_size():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path, output_file_path, 3.5, 'Date', 'Open')
    assert str(exc_info.value) == "Window size must be an integer"  


def test_large_window_size():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path, output_file_path, 100, 'Date', 'Open')
    assert str(exc_info.value) == """Window size cannot be greater than the number of rows in the dataframe"""


def test_string_window_size():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        calculate_rsi(input_file_path, output_file_path, "Hello", 'Date', 'Open')
    assert str(exc_info.value) == "Window size must be an integer"

