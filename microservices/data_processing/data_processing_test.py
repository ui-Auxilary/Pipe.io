# import pytest
from microservices.data_collection.collection import import_yahoo
from microservices.data_processing.data_processing import drop_column


def test_import_yahoo_default():
    df = import_yahoo()
    assert not df.empty
    print(df)

df = import_yahoo()
assert not df.empty
print(df)