import numpy as np


def print_hello_world():
    """Prints hello world to stdout
    """

    print("Hello world")


def add_two(number: int):
    """Adds two to a number

    Args:
        number (int): number to add two to

    Returns:
        int: original input number plus two
    """

    return number + 2


def add_x(number, x):
    """Adds x to a number

    Args:
        number (int): number to add x to
        x (int): number to add to number

    Returns:
        int: original input number plus x
    """

    return number + x


def print_numpy_array(list_ints):
    """Prints a numpy array

    Args:
        list_ints (list[int]): list of ints to print
    """

    print(np.array(list_ints))
