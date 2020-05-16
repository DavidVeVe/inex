import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = <input />;
      break;
    case "textarea":
      inputElement = <textarea name="" id="" cols="30" rows="10" />;
      break;
    case "select":
      inputElement = <select></select>;
      break;
    default:
      inputElement = <input />;
  }

  return <div>{inputElement}</div>;
};

export default input;
