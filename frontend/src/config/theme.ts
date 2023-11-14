import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    body: '#eee',
    text: '#000',
    header: {
        backgroundColor: '#fff'
    },
    sidebar: {
        backgroundColor: '#5a279b'
    },
    pipe: {
        backgroundColor: '#FFF',
        highlightColor: '#F9FAFF'
    }
};

export const darkTheme: DefaultTheme = {
    body: '#333',
    text: '#f1f1f1',
    header: {
        backgroundColor: '#1d1f20'
    },
    sidebar: {
        backgroundColor: '#16111d'
    },
    pipe: {
        backgroundColor: '#16111d',
        highlightColor: '#1f2233'
    }
};
