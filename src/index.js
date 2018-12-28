import React from "react";
import ReactDOM from "react-dom";
import ScheduleEvent from "./ScheduleEvent";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Create your Event</h1>
      <ScheduleEvent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
