import React from "react";
import { Link } from "react-router-dom";

import "./Error.scss";

export default function Error() {
  return (
    <div className="error_container">
      <h1 className="section-title">Ups...</h1>
      <p className="error--txt">
        It seems like the page you're looking for doesn't exits 🧐.
      </p>
      <Link to={"/"}>Let's leave the unknown for now 🏡</Link>
    </div>
  );
}
