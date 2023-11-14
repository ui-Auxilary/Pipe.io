import pandas as pd

def merge_csv(input_file_path_1: str = 'stock_data.csv', input_file_path_2: str = 'stock_data_2.csv', output_file_path: str = 'stock_data.csv', how: str = 'inner', left_on: str ='Date', right_on: str ='Date'):
    """Merges csv using pandas.DataFrame.merge

    Args:
        input_file_path_1 (str, optional): path for the first input csv. Defaults to 'stock_data.csv'.
        input_file_path_2 (str, optional): path for the second input csv. Defaults to 'stock_data_2.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.
        how (str, optional): Type of merge, as defined by df.merge. Defaults to 'inner'.
        left_on (str, optional): left key of merge, as defined by df.merge. Defaults to 'Date'.
        right_on (str, optional): right key of merge, as defined by df.merge. Defaults to 'Date'.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    df1 = pd.read_csv(input_file_path_1, index_col=0)
    df2 = pd.read_csv(input_file_path_2, index_col=0)
    
    try:
        df3 = df1.merge(df2, left_on = left_on, right_on = right_on)
    except KeyError:
        raise ValueError("Column(s) not found")

    df3.to_csv(output_file_path)
    return df3.to_json()