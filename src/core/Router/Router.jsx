import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "../../pages/Home";
import PorfolioNavigation from "../../shared/PorfolioNavigation/PorfolioNavigation";

export function Router() {
  return (
    <Routes>
      <Route path="/web" element={<PorfolioNavigation />} />
      <Route path="/photography" element={<PorfolioNavigation />} />
      <Route path="/graphic" element={<PorfolioNavigation />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
