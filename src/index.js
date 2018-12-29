import React from "react";
import ReactDOM from "react-dom";
import ScheduleEvent from "./ScheduleEvent";
import combineReducers from "./reducers/index";
import {Provider} from "react-redux";
import {createStore} from "redux";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Event Scheduler</h1>
      <ScheduleEvent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={createStore(combineReducers)}><App /></Provider>, rootElement);
