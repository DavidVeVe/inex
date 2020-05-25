import React from "react";

import "./Button.css";

const button = (props) => (
  <button
    onClick={props.clicked}
    style={{ width: props.width, fontSize: props.fontSize, color: props.color }}
    className={["btn", props.btnType, props.disabled ? "disabled" : null].join(
      " "
    )}
    type={props.type}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;
