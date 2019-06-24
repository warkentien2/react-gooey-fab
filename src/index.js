import React from "react";
import ReactDOM from "react-dom";
import FAB from "./FAB";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <FAB />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
