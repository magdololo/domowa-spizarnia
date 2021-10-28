import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";



const breakpoints = {
    values: {
        xs: 0,
        sm: 400,
        md: 700,
        lg: 1000,
        xl: 1536,

    }
}

const theme = createTheme({
    breakpoints: breakpoints,
    typography: {
        fontFamily: [
            '"Sora"',
            'sans serif',
            '"Archivo"',
        ].join(','),
    },
    button: {
        "&:hover": {
            backgroundColor: "transparent",
        }},
});

ReactDOM.render(
    <React.StrictMode>


        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>


    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
