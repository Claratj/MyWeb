import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";

import './App.css';

import { Routes } from './core/Routes/Routes';

function App() {


  return (
    <Router>
      <div className="App">
    <Routes></Routes>
      </div>
     </Router>
  );
}

export default App;
