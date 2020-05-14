import React from "react";

import "./Backdrop.css";

const backdrop = (props) =>
  props.show ? (
    <div onClick={props.clicked} className="backdrops__container">
      {props.children}
    </div>
  ) : null;

export default backdrop;
