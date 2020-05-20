import React from "react";

import "./ListControls.css";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import Button from "../UI/Button/Button";

const listControls = (props) => (
  <div className="listControls__container">
    <Button
      width="15%"
      fontSize=".9rem"
      btnType="add"
      color="white"
      clicked={props.toggleModal}
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: () => dispatch(actions.toggleModal()),
  };
};

export default connect(null, mapDispatchToProps)(listControls);
