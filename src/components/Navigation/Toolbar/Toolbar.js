import React from "react";

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
            clicked={props.showIncome}
            className="boton"
            width="30%"
            btnType="white"
          >
            Ingresos
          </Button>
          <Button clicked={props.showExpenses} width="30%" btnType="white">
            Gastos
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
