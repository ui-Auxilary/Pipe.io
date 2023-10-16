import pytest
from data_processing import drop_column, sort_column
import pandas as pd
from math import isclose


def test_remove_simple():
    df = pd.read_csv("stock_data.csv")
    assert("Open" in df)
    
    drop_column(output_file_path = "updated_data.csv", columns="Open")

    df2 = pd.read_csv("updated_data.csv")
    assert("Open" not in df2)


def test_remove_unfound_column():
    df = pd.read_csv("stock_data.csv")
    
    drop_column(output_file_path = "updated_data.csv", columns="A")
    df2 = pd.read_csv("updated_data.csv")
    assert(set(df.columns) == set(df2.columns))

def test_remove_multiple():
    df = pd.read_csv("stock_data.csv")
    
    drop_column(output_file_path = "updated_data.csv", columns="A,Open, Open, High, hgigh")
    df2 = pd.read_csv("updated_data.csv")
    assert(len(df.columns) == len(df2.columns) + 2)


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
    sort_column(output_file_path = "updated_data.csv", columns="boopy, Dividends Desc, Dky Asc,Open")

    df2 = pd.read_csv("updated_data.csv")
    assert(isclose(df2["Open"][0], 241.14456487640618))