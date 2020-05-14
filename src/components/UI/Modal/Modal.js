import React, { Fragment } from "react";

import "./Modal.css";

import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <Fragment>
    <Backdrop show={props.show} clicked={props.clickClosed} />
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
      className="modal__container"
    >
      {props.children}
    </div>
  </Fragment>
);

export default modal;
