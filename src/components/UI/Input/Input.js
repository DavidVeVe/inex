import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.inputElement];
  let validationError = null;
  let validationErrorMessage = null;

  switch (props.valueType) {
    case "itemName":
      validationErrorMessage = "nombre";
      break;
    case "amount":
      validationErrorMessage = "cantidad";
      break;
    case "category":
      validationErrorMessage = "categoria";
      break;
    case "date":
      validationErrorMessage = "fecha";
      break;
    case "description":
      validationErrorMessage = "descripción";
      break;
    default:
      validationErrorMessage = null;
      break;
  }

  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.error__message}>
        Ingresa{" "}
        <span style={{ textTransform: "capitalize" }}>
          {validationErrorMessage}
        </span>
      </p>
    );
  }

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
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
        <select
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
        >
          {console.log(props.value)}
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
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.input__div}>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
