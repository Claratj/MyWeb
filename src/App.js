import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { Footer } from "./core/Footer/Footer";
import { Header } from "./core/Header/Header";
import { Routes } from "./core/Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Header />
        <Footer />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
