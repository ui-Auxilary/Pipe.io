import pandas as pd
data1 = pd.read_csv('C:/Users/86150/Desktop/comp3900/csv1.csv')

def sortByColumn_ascending (data, column):
    return data.sort_values(column, ascending = True)
def sortByColumn_descending (data, column):
    return data.sort_values(column, ascending = False)
def merge_columns(data1, data2, )
