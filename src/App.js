import './App.css';
import {
  BrowserRouter as Router } from "react-router-dom";
import { Routes } from './core/Routes/Routes';
import { Menu } from './core/Menu/Menu';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Menu/> 
          <Routes/>
        </div>
      </div>
    </Router>
  );
}

export default App;
