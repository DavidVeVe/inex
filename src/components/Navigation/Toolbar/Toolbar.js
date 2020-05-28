import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import * as actions from "../../../store/actions";

import Button from "../../UI/Button/Button";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  const [isLogin, setIsLogin] = useState(false);

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
  };

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
          {props.authenticated ? (
            <Link
              to="/logout"
              onClick={switchAuthMode}
              className={classes.authenticateBtn}
            >
              Cerrar Sesión
            </Link>
          ) : (
            <Link
              onClick={switchAuthMode}
              to={isLogin ? "/" : "/auth"}
              className={classes.authenticateBtn}
            >
              {isLogin ? "Inicio" : "Iniciar Sesión"}
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
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVersion: () => dispatch(actions.setVersion()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
