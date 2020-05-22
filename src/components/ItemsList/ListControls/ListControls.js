import React from "react";

import "./ListControls.css";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";

import Button from "../../UI/Button/Button";

const listControls = (props) => (
  <div className="listControls__container">
    <Button
      width="15%"
      fontSize=".9rem"
      btnType="add"
      color="white"
      clicked={props.toggleModalForm}
    >
      Nuevo
    </Button>
    {props.incomeVersion ? (
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

const mapStateToProps = (state) => {
  return {
    incomeVersion: state.form.incomeVersion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(listControls);
