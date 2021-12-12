import React from "react";
import Button from "../../../shared/Button/Button";
import useCreative from "../useCreative";

import "../Creative.scss";

interface IField {
  value: string;
}

export default function DisplayIntro({ value }: IField) {
  const { photographyData, graphicDesignData } = useCreative();

  switch (value) {
    case "photo":
      return (
        <div className="creative">
          <h3 className="creative-title">Photography</h3>
          <div className="creative-grid">
            {photographyData.slice(0, 3).map((project) => {
              return (
                <figure>
                  <img
                    src={project?.photo}
                    alt={project?.title}
                    className="img-grid"
                  />
                </figure>
              );
            })}
          </div>
          <Button text={"More please!"} path={"/photography"} />
        </div>
      );
    case "design":
      return (
        <div className="creative">
          <h3 className="creative-title">Graphic Design</h3>
          <div className="creative-grid">
            {graphicDesignData.slice(0, 3).map((project) => {
              return (
                <figure>
                  <img
                    src={project?.photo}
                    alt={project?.title}
                    className="img-grid"
                  />
                </figure>
              );
            })}
          </div>
          <Button text={"More please!"} path={"/graphic"} />
        </div>
      );
    default:
      return <p></p>;
  }
}
