import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
    typography: {
        fontFamily: [
            '"Sora"',
            'sans serif',
            '"Archivo"' ,
            ].join(','),
        },
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 700,
            lg: 1000,
            xl: 1536,
        }
    }
    });

ReactDOM.render(
    <ThemeProvider theme={theme}>
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
