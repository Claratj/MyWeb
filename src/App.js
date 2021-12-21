import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./core/Router/Router";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
