import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {darken, ThemeProvider} from "@material-ui/core/styles";
import {createTheme} from '@material-ui/core/styles';
import {blue, blueGrey, deepOrange, lightGreen, red, teal, yellow} from "@material-ui/core/colors";
import {CssBaseline} from "@material-ui/core";
import {dark} from "@material-ui/core/styles/createPalette";
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";

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
