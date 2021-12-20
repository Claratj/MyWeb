import React, { useEffect, useState } from "react";

import Projects from "../../data/Projects.json";

export default function useWebDev() {
  const [projects, setProjects] = useState([] as any[]);

  useEffect(() => {
    setProjects(Projects);
  }, []);

  return {
    projects,
  };
}
