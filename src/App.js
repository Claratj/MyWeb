import './App.css';
import {
  BrowserRouter as Router } from "react-router-dom";
import { Routes } from './core/Routes/Routes';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Routes/>
        </div>
      </div>
    </Router>
  );
}

export default App;
