import React from "react";

import "./Button.css";

const button = (props) => (
  <button
    onClick={props.clicked}
    style={{ width: props.width, fontSize: props.fontSize, color: props.color }}
    className={["btn", props.btnType].join(" ")}
    type={props.type}
  >
    {props.children}
  </button>
);

export default button;
