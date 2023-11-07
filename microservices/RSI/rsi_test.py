import os
import pandas as pd
from rsi import calculate_rsi

def test_calculate_rsi():
    sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05'],
        'Open': [100, 101, 99, 102, 98]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data.csv', index=False)
    calculate_rsi('sample_stock_data.csv', 'sample_rsi.csv', 3, "Date", "Open")
    output_df = pd.read_csv('sample_rsi.csv')
    assert 'RSI' in output_df.columns
    assert (output_df['RSI'].tolist() == [50.0, 75.0, 33.333333, 80.0, 20.0])
    os.remove('sample_stock_data.csv')
    os.remove('sample_rsi.csv')