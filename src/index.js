import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import api from './api/smashtrack';
import LoginForm from './components/LoginForm';
import { Container } from 'react-bootstrap';

(async function() {
    if (!await api.isLoggedIn()) {
        ReactDOM.render(<Container><LoginForm /></Container>,   document.getElementById("root"))
    }
    else {
        ReactDOM.render(
          <BrowserRouter>
            <App />
          </BrowserRouter>,
          document.getElementById("root")
        );
    }

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}());
