import pytest
import pandas as pd
import os
from moving_average import moving_average
import numpy as np
sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', 
                 '2023-11-04', '2023-11-05'],
        'Volume': [100, 200, 300, 400, 500]
    }
sample_df = pd.DataFrame(sample_data)
sample_df.to_csv('sample_stock_data.csv')
def test_moving_average_basic():
    
    moving_average('sample_stock_data.csv', 'sample_moving_average.csv', 
                   3, "Date", "Volume")
    output_df = pd.read_csv('sample_moving_average.csv')
    assert('Moving Average' in output_df.columns)
    expected_values = [np.nan, np.nan, 200.0, 300.0, 400.0]
    np.testing.assert_allclose(output_df['Moving Average'].tolist(), expected_values, equal_nan=True)
    #os.remove('sample_stock_data.csv')
    os.remove('sample_moving_average.csv')
def test_moving_average_hard():
    sample_data = {
        'Date': ['2023-11-01', 
                 '2023-11-04','2023-11-03' ,'2023-11-05', '2023-11-02'],
        'Volume': [200, 100, 80, 500, 10]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data2.csv')
    moving_average('sample_stock_data2.csv', 'sample_moving_average2.csv', 
                   2, "Date", "Volume")
    output_df = pd.read_csv('sample_moving_average2.csv')
    assert('Moving Average' in output_df.columns)
    expected_values = [np.nan, 105.0, 45.0, 90.0, 300.0]
    np.testing.assert_allclose(output_df['Moving Average'].tolist(), expected_values, equal_nan=True)
    os.remove('sample_stock_data2.csv')
    os.remove('sample_moving_average2.csv')


def test_invalid_file_extension():
    with pytest.raises(ValueError) as exc_info:
        moving_average('invalid_input.txt','invalid_output.txt', 3, 'Date', 'Volume')
    assert str(exc_info.value) == "Input and output file paths must have .csv extension"


def test_nonexistent_file():
    with pytest.raises(FileNotFoundError) as exc_info:
        moving_average(input_file_path='nonexistent_file.csv', 
                       output_file_path='nonexistent_output.csv', window_size=3, 
                       date_column='Date', value_column='Volume')
    assert str(exc_info.value) == f"Input file not found: nonexistent_file.csv"


def test_missing_columns():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        moving_average(input_file_path, output_file_path, 3, 'Date', 'InvalidColumn')
    assert str(exc_info.value) == "Columns Date and InvalidColumn must exist in the input dataframe"


def test_non_integer_window_size():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        moving_average(input_file_path, output_file_path, 3.5, 'Date', 'Volume')
    assert str(exc_info.value) == "Window size must be an integer"  


def test_large_window_size():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        moving_average(input_file_path, output_file_path, 100, 'Date', 'Volume')
    assert str(exc_info.value) == """Window size cannot be greater than the number of rows in the dataframe"""


def test_string_window_size():
    input_file_path = "sample_stock_data.csv"
    output_file_path = "sample_moving_average.csv"
    with pytest.raises(ValueError) as exc_info:
        moving_average(input_file_path, output_file_path, "Hello", 'Date', 'Volume')
    assert str(exc_info.value) == "Window size must be an integer"