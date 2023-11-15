import pandas as pd

def write_table(input_file_path: str = 'stock_data.csv'):
    """Visualises a table from a csv file.

    Args:
        input_file_path (str, optional): Path to the input csv file. Defaults to 'stock_data.csv'.

    Returns:
        str: JSON object containing the table representation
    """
    
    
    table = pd.read_csv(input_file_path)
    return table.to_json()