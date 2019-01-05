import React from "react";
import ReactDOM from "react-dom";
import ScheduleEvent from "./ScheduleEvent";
import Login from "./Login";
import combineReducers from "./reducers/index";
import {Provider} from "react-redux";
import {createStore} from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/ScheduleEvent" component={ScheduleEvent} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={createStore(combineReducers)}><App /></Provider>, rootElement);
