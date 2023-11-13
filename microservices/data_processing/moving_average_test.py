import pytest
import os
from microservices.data_processing.moving_average import moving_avergae
def test_moving_average():
    moving_avergae("data/stock_data.csv", "data/moving_avergae.csv", 5, "Date", "Volume")
    assert os.path.exists("data/moving_avergae.csv") == True