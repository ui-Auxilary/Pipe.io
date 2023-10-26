import pytest
from data_processing import drop_column, sort_column, merge_csv, plot_data
import pandas as pd
from math import isclose


def test_remove_no_input():
    with pytest.raises(FileNotFoundError) as exc_info:
        drop_column(input_file_path = "stock_daaata.csv", columns="Open")
    assert str(exc_info.value) == '[Errno 2] No such file or directory: \'stock_daaata.csv\''

def test_remove_simple():
    df = pd.read_csv("stock_data.csv")
    assert("Open" in df)
    
    drop_column(output_file_path = "updated_data.csv", columns="Open")

    df2 = pd.read_csv("updated_data.csv")
    assert("Open" not in df2)


def test_remove_unfound_column():
    df = pd.read_csv("stock_data.csv")
    with pytest.raises(ValueError) as exc_info:   
        drop_column(output_file_path = "updated_data.csv", columns="A")
    assert str(exc_info.value) == 'Column(s) not found'

def test_remove_multiple():
    df = pd.read_csv("stock_data.csv")
    
    with pytest.raises(ValueError) as exc_info:  
        drop_column(output_file_path = "updated_data.csv", columns="A,Open, Open, High, hgigh")
    assert str(exc_info.value) == 'Column(s) not found'
    # assert(len(df.columns) == len(df2.columns) + 2)

def test_sort_no_input():
    with pytest.raises(FileNotFoundError) as exc_info:
        sort_column(input_file_path = "stock_daaata.csv", columns="Open")
    assert str(exc_info.value) == '[Errno 2] No such file or directory: \'stock_daaata.csv\''

def test_sort_simple():
    df = pd.read_csv("stock_data.csv")
    assert(df["Open"][0] != 215.4684134832264)
    sort_column(output_file_path = "updated_data.csv", columns="Open")

    df2 = pd.read_csv("updated_data.csv")
    assert(isclose(df2["Open"][0], 215.4684134832264))

def test_sort_multiple():
    df = pd.read_csv("stock_data.csv")
    assert(df["Open"][0] != 215.4684134832264)
    sort_column(output_file_path = "updated_data.csv", columns="Dividends Desc, Open")

    df2 = pd.read_csv("updated_data.csv")
    assert(isclose(df2["Open"][0], 241.14456487640618))

def test_sort_unfound():
    df = pd.read_csv("stock_data.csv")
    assert(df["Open"][0] != 215.4684134832264)
    with pytest.raises(ValueError) as exc_info:  
        sort_column(output_file_path = "updated_data.csv", columns="boopy, Dividends Desc, Dky Asc,Open")
    assert str(exc_info.value) == 'Column boopy not found'
    df2 = pd.read_csv("updated_data.csv")
    # assert(isclose(df2["Open"][0], 241.14456487640618))

def test_sort_low_length():
    df = pd.read_csv("stock_data.csv")
    assert(df["Open"][0] != 215.4684134832264)
    with pytest.raises(ValueError) as exc_info:  
        sort_column(output_file_path = "updated_data.csv", columns="a, b Desc, cd Asc,e")
    assert str(exc_info.value) == 'Column a not found'
    


def test_merge_column_not_found():
    with pytest.raises(ValueError) as exc_info:  
        merge_csv(input_file_path_1="stock_data.csv", input_file_path_2="updated_data.csv", left_on="Daate", right_on="Daaate")
    assert str(exc_info.value) == 'Column(s) not found'

def test_plot():
    plot_data(x_axis="Open", y_axis="Close")
    plot_data()

def test_fail_plot():
    with pytest.raises(ValueError) as exc_info:  
        plot_data(x_axis="s", y_axis="asd")
    assert str(exc_info.value) == 'Column(s) not found'