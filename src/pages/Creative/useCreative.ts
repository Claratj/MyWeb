import React, { useEffect, useState } from "react";

import Photography from "../../data/Photography.json";
import GraphicDesign from "../../data/GraphicDesign.json";

export default function useCreative() {
  const [photographyData, setPhotographyData] = useState([] as any[]);
  const [graphicDesignData, setGraphicDesignData] = useState([] as any[]);

  useEffect(() => {
    setPhotographyData(Photography);
    setGraphicDesignData(GraphicDesign);
  }, []);
  return {
    photographyData,
    graphicDesignData,
  };
}
