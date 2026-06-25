import React from "react";
import { Routes, Route } from "react-router-dom";
import GraphicPorfolio from "../../pages/Creative/GraphicPorfolio/GraphicPorfolio";
import PhotographyPorfolio from "../../pages/Creative/PhotographyPorfolio/PhotographyPorfolio";
import Error from "../../pages/Error/Error";

import { Home } from "../../pages/Home";
import WebPorfolio from "../../pages/WebDevelopment/WebPorfolio/WebPorfolio";

export function Router() {
  return (
    <Routes>
      <Route path="/web" element={<WebPorfolio />} />
      <Route path="/photography" element={<PhotographyPorfolio />} />
      <Route path="/graphic" element={<GraphicPorfolio />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
