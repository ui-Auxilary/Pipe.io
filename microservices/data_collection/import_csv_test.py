import pytest
from microservices.data_collection.collection import import_csv, import_yahoo
from pymongo import MongoClient



def test_import_csv_returns_df():
    df = import_csv("data/stock.csv")
    assert not df.empty

def test_import_yahoo_default():
    df = import_yahoo()
    assert not df.empty