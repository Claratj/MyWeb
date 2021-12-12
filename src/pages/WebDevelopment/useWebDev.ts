import React, { useEffect, useState } from "react";

import Projects from "../../data/Projects.json";

export default function useWebDev() {
  const [projects, setProjects] = useState([] as any[]);

  const showLess: boolean = true;

  useEffect(() => {
    setProjects(Projects);
  }, []);

  return {
    projects,
    showLess,
  };
}
