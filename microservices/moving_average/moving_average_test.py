import pytest
import pandas as pd
import os
from moving_average import moving_avergae
def test_moving_average():

    sample_data = {
        'Date': ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05'],
        'Volume': [100, 200, 300, 400, 500]
    }
    sample_df = pd.DataFrame(sample_data)
    sample_df.to_csv('sample_stock_data.csv')
    moving_avergae('sample_stock_data.csv', 'sample_moving_average.csv', 3, "Date", "Volume")
    output_df = pd.read_csv('sample_moving_average.csv')
    assert('moving_average' in output_df.columns)
    assert (output_df['RSI'].tolist() == [100.0, 150.0, 200.0, 300.0, 400.0])
    os.remove('sample_stock_data.csv')
    os.remove('sample_moving_average.csv')

