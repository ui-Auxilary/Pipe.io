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

def time_prediction_future_stock_values(stock_input_file_path: str = 'stock_data.csv', sentiment_input_file_path: str = 'sentiment_data.csv', number_of_days_to_predict: int = EXTRAPOLATE_DAYS, days_from_each_prediction: int = DAYS_TO_TAKE_FROM_EACH_PREDICTION, prepend_stock_data: bool = False, output_file_path: str = 'stock_predictions.csv'):
    
    """ Predicts the future values of a stock based on a model trained on historical data.
    
    Args:
        stock_input_file_path (str): Path to the stock data csv file.
        sentiment_input_file_path (str): Path to a file with a sentiment float value.
        number_of_days_to_predict (int): Number of future days to predict.
        days_from_each_prediction (int): Number of days from each prediction used for the next prediction (do not change unless you know what you are doing).
        prepend_stock_data (bool): Whether past stock data will be prepended to the predictions. If False, only future predictions will be generated.
        output_file_path (str): Specific csv path to output the predictions to.

    Returns:
        str: JSON containing comma separated values of the predicted stock values.
    """

    model = _load_model()

    # load stock dataframe
    stock_df = pd.read_csv(stock_input_file_path)
    num_existing_days = len(stock_df)

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
    return_predictions = model_completed_predictions if prepend_stock_data else model_completed_predictions[-EXTRAPOLATE_DAYS:]
    
    df = pd.DataFrame(return_predictions)

    df.reset_index(inplace=True)
    df=df.set_axis(["Date","Close"], axis=1)

    start_date = pd.Timestamp(stock_df["Datetime"].iloc[-1]) - pd.Timedelta(days=num_existing_days)
    date_range = pd.date_range(start_date, periods=len(df))
    df["Date"] = date_range

    df.to_csv(output_file_path, header=True)

    return df.to_json()

if __name__ == "__main__":
    print(list(time_prediction_future_stock_values()))
