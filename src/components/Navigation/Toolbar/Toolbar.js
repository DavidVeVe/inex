import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";

import "./Toolbar.css";

import Button from "../../UI/Button/Button";

const Toolbar = (props) => {
  return (
    <nav
      className={["toolbar__container", props.showMenu ? "showMenu" : ""].join(
        " "
      )}
    >
      <div className="toolbar__buttons">
        <div className="toolbar__controls">
          <Button
            clicked={props.setVersion}
            className="boton"
            width="30%"
            btnType="white"
          >
            Ingresos
          </Button>
          <Button clicked={props.setVersion} width="30%" btnType="white">
            Gastos
          </Button>
        </div>
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setVersion: () => dispatch(actions.setVersion()),
  };
};

export default connect(null, mapDispatchToProps)(Toolbar);
