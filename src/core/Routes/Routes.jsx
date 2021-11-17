import React from "react";
import { Route } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import WebPortfolio from "../../pages/WebDevelopment/WebPorfolio/WebPorfolio";
import PhotographyPortfolio from "../../pages/Creative/PhotographyPorfolio/PhotographyPorfolio";
import GraphicPortfolio from "../../pages/Creative/GraphicPorfolio/GraphicPorfolio";

export function Routes() {
  return (
    <Routes>
      <Route path="/web" element={<WebPortfolio />} />
      <Route path="/photography" element={<PhotographyPortfolio />} />
      <Route path="/graphic" element={<GraphicPortfolio />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
