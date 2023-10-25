import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from dateutil.parser import parse

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

def is_date(string, fuzzy=False):
    """
    Return whether the string can be interpreted as a date.

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True

    Sourced from https://stackoverflow.com/questions/25341945/check-if-string-has-date-any-format
    """
    try: 
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False


def plot_data(input_file_path: str = 'stock_data.csv', output_file_path: str = "stock_chart.png", x_axis: str ='Date', y_axis: str ='Close'):
    stock_data = pd.read_csv(input_file_path)
    try:
        if "date" in x_axis.lower():
            x = mdates.num2date(mdates.datestr2num(stock_data[x_axis]))
        else:
            x = stock_data[x_axis]
        if "date" in y_axis.lower():
            y = mdates.num2date(mdates.datestr2num(stock_data[y_axis]))
        else:
            y = stock_data[y_axis]
    except(KeyError):
        raise ValueError("Column(s) not found")
    plt.plot(x, y)
    plt.xlabel(x_axis)
    plt.ylabel(y_axis)
    plt.title('Data comparison')
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Save the chart to a file (optional)
    plt.savefig(output_file_path)


    # Show the chart (optional)
    # plt.show()