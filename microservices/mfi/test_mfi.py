from mfi import calculate_mfi
import pytest
import pandas as pd

def test_mfi():
    new_df = calculate_mfi("stock_data.csv", "mfi.csv", 14, "High", "Low", "Close", "Volume", "Date")
    assert("MFI" in new_df)