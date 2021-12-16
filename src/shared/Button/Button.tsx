import { Link } from "react-router-dom";
import React from "react";

import cv from "../../download/cv.pdf";

interface IButtonProps {
  text: string;
  path: string;
}

export default function Button(props: IButtonProps) {
  switch (props.text) {
    case "CV Download":
      return (
        <a href={cv} download="cv_clara_toloba_eng.pdf" className="btn-more">
          <span>{props.text}</span>
        </a>
      );
    case "More please!":
      return (
        <Link to={props.path}>
          <button className="btn-more">
            <span>{props.text}</span>
          </button>
        </Link>
      );
    default:
      return <></>;
  }
}
