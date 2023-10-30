import tensorflow as tf
import numpy as np
import pandas as pd
import json

# DEFAULT CONSTANTS
EXTRAPOLATE_DAYS = 200
DAYS_TO_TAKE_FROM_EACH_PREDICTION = 10

# MODEL CONSTANTS
WINDOW_SIZE = 100

def _load_model():
    return tf.keras.models.load_model('../additional_required_modules/stock_predictor.h5')

def predict_future_stock_values(stock_input_file_path: str = 'stock_data.csv', sentiment_input_file_path: str = 'sentiment_data.csv', number_of_days_to_predict: int = EXTRAPOLATE_DAYS, days_from_each_prediction: int = DAYS_TO_TAKE_FROM_EACH_PREDICTION, prepend_stock_data: str = 'yes'):
    
    """ Predicts the future values of a stock based on a model trained on historical data.
    
    Args:
        stock_input_file_path (str): Path to the stock data csv file.
        sentiment_input_file_path (str): Path to a file with a sentiment float value.
        number_of_days_to_predict (int): Number of future days to predict.
        days_from_each_prediction (int): Number of days from each prediction used for the next prediction (do not change unless you know what you are doing).
        prepend_stock_data (bool): Whether past stock data will be prepended to the predictions. If False, only future predictions will be generated.

    Returns:
        : _description_
    """

    model = _load_model()

    # load stock dataframe
    stock_df = pd.read_csv(stock_input_file_path)

    # load sentiment value
    with open(sentiment_input_file_path) as f:
        sentiment_value = float(f.readline())

    last_window = np.array(stock_df.Close)[-WINDOW_SIZE:]
    complete_predictions = np.array([])
    while len(complete_predictions) < EXTRAPOLATE_DAYS:
        prediction = model.predict(np.array([np.append(last_window, sentiment_value)]))
        complete_predictions = np.concatenate((complete_predictions, prediction[0]))
        last_window = np.concatenate((last_window[DAYS_TO_TAKE_FROM_EACH_PREDICTION:], prediction[0]))
    
    model_completed_predictions = np.array(list(stock_df.Close) + list(complete_predictions))
    return_predictions = model_completed_predictions if prepend_stock_data == 'yes' else model_completed_predictions[-EXTRAPOLATE_DAYS:]
    
    return pd.DataFrame(return_predictions).to_json()

if __name__ == "__main__":
    print(list(predict_future_stock_values()))
