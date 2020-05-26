import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../store/actions";

import Button from "../../UI/Button/Button";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  return (
    <nav
      className={[
        classes.toolbar__container,
        props.showMenu ? classes.showMenu : "",
      ].join(" ")}
    >
      <div className={classes.toolbar__buttons}>
        {props.authenticated ? (
          <div className={classes.toolbar__controls}>
            {props.incomeVersion ? (
              <Button clicked={props.setVersion} width="30%" btnType="white">
                Gastos
              </Button>
            ) : (
              <Button clicked={props.setVersion} width="30%" btnType="white">
                Ingresos
              </Button>
            )}
          </div>
        ) : null}
        <div className={classes.authenticateBtns}>
          {!props.authenticated ? (
            <Link
              to="/auth"
              className={classes.authenticateBtn}
              clicked="ohla"
              btnType="white"
              width="35%"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <Link
              to="/"
              className={classes.authenticateBtn}
              clicked="ohla"
              btnType="white"
              width="35%"
            >
              Cerrar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    incomeVersion: state.form.incomeVersion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVersion: () => dispatch(actions.setVersion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
