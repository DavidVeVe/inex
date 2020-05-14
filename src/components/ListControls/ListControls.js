import React from "react";

import "./ListControls.css";

import Button from "../UI/Button/Button";

const listControls = (props) => (
  <div className="listControls__container">
    <Button
      width="15%"
      fontSize=".9rem"
      btnType="add"
      color="white"
      clicked={props.openForm}
    >
      Nuevo
    </Button>
    {props.version ? (
      <p className="listControls__total">
        Ingresos total: <span>$ {props.total}.00</span>
      </p>
    ) : (
      <p className="listControls__total">
        Gastos total: <span>$ {props.total}.00</span>
      </p>
    )}
  </div>
);

export default listControls;
