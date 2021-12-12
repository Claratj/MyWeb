import React from "react";

import "./Creative.scss";
import DisplayIntro from "./components/DisplayIntro";

export function Creative() {
  return (
    <div className="main">
      <h2 className="section-title">Creative</h2>
      <h3 className="section-subtitle">Technologies I work with</h3>
      <section className="technologies">
        <div>
          <span>Photoshop |</span>
          <span> Illustrator |</span>
          <span> InDesign |</span>
          <span> Premiere Pro </span>
        </div>
      </section>
      <section className="porfolio-creative">
        <DisplayIntro value="photo" />
        <DisplayIntro value="design" />
      </section>
    </div>
  );
}
