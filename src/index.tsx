import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {darken, ThemeProvider} from "@material-ui/core/styles";
import {createTheme} from '@material-ui/core/styles';
import {blueGrey, deepOrange} from "@material-ui/core/colors";
import {CssBaseline} from "@material-ui/core";
import AppWithRedux from "./components/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithReduxWithoutProps from "./TodolistWithoutProps/AppWithReduxWithoutProps";


const theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: deepOrange,
        type: "light"
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/*сбрасывает стили (сбрасывает background)*/}
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
