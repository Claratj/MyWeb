import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebPortfolio from "./pages/WebDevelopment/WebPorfolio/WebPorfolio";
import PhotographyPortfolio from "./pages/Creative/PhotographyPorfolio/PhotographyPorfolio";
import GraphicPortfolio from "./pages/Creative/GraphicPorfolio/GraphicPorfolio";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/web" element={<WebPortfolio />} />
        <Route path="/photography" element={<PhotographyPortfolio />} />
        <Route path="/graphic" element={<GraphicPortfolio />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
