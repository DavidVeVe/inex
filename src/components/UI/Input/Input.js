import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
          name=""
          id=""
          cols="30"
          rows="2"
        />
      );
      break;
    case "select":
      inputElement = (
        <select onChange={props.changed} value={props.value}>
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
  }

  return <div className={classes.input__div}>{inputElement}</div>;
};

export default input;
