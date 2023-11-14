import pandas as pd

def drop_column(input_file_path: str = 'stock_data.csv', output_file_path: str = 'stock_data.csv', columns: str = ''):
    """Drops specified columns from csv

    Args:
        input_file_path (str, optional): path for the input csv. Defaults to 'stock_data.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.
        columns (str, optional): comma seperated column names to be dropped. Defaults to ''.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    df = pd.read_csv(input_file_path, index_col=0)
    column_list = [s.strip() for s in columns.split(',')]

    for column in column_list:
        try:
            df = df.drop(columns=[column])
        except KeyError:
            raise ValueError("Column(s) not found")
    
    df.to_csv(output_file_path)
    return df.to_json()