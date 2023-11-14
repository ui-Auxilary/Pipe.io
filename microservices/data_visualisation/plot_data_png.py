import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates


def plot_data_png(input_file_path: str = 'stock_data.csv', output_file_path: str = "stock_chart.png", x_axis: str ='Date', y_axis: str ='Close'):
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