import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./component/App";
import reducers from "./reducers";
import "./styles.css";

const ourStore = createStore(reducers, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={ourStore}>
        <App />
    </Provider>,
    document.getElementById("root"));