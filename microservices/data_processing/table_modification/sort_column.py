import pandas as pd

def sort_column(input_file_path: str = 'stock_data.csv', output_file_path: str = 'stock_data.csv', columns: str = ''):
    """Sorts csv on specified column

    Args:
        input_file_path (str, optional): path for the input csv. Defaults to 'stock_data.csv'.
        output_file_path (str, optional): path for the output csv. Defaults to 'stock_data.csv'.
        columns (str, optional): comma seperated column names to be sorted on, in order and including direction. Defaults to ''. Example usage: columns: "Open Asc, High Desc, Dividends". If no Asc or Desc is provided, defaults to Asc.

    Returns:
        pd.DataFrame: Dataframe from the csv file
    """
    df = pd.read_csv(input_file_path, index_col=0)
    combined_column_list = [s.strip() for s in columns.split(',')]
    # column list and corresponding ascending list which specifies whether the column list item is to be ascending
    ascending_list = []
    column_list = []
    for col in combined_column_list:
        if col[-3:].lower() == "asc" and col[:-3].strip() in df:
            ascending_list.append(True)
            column_list.append(col[:-3].strip())
        elif col[-4:].lower() == "desc" and col[:-4].strip() in df:
            ascending_list.append(False)
            column_list.append(col[:-4].strip())
        elif col in df:
            ascending_list.append(True)
            column_list.append(col)
        else:
            raise ValueError(f"Column {col} not found")

    if column_list:
        df = df.sort_values(by=column_list, ascending=ascending_list)
    
    df.to_csv(output_file_path)
    return df.to_json()