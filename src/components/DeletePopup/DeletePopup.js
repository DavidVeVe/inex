import React from "react";
import { connect } from "react-redux";

import "./DeletePopup.css";

import * as actions from "../../store/actions";

import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

const deletePopup = (props) => {
  return (
    <Modal show={props.showDeletePopup} clickClosed={props.toggleDeletePopup}>
      <div className="deletePopup__container">
        <p
          className="deletePopup__container-q"
          style={{ fontWeight: "bold", color: "#222222" }}
        >
          ¿Estas seguro que deseas eliminar este registro?
        </p>
        <p className="deletePopup__name">Nombre:</p>
        <p className="deletePopup__name-itemName">{props.itemName} </p>
        <div className="deletePopup__btns">
          <Button
            clicked={props.removeItem}
            width="30%"
            color="white"
            btnType="add"
          >
            Eliminar
          </Button>
          <Button
            clicked={(e) => props.toggleDeletePopup(e, null)}
            width="30%"
            color="white"
            btnType="cancel"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    showDeletePopup: state.form.showDeletePopup,
    itemName: state.form.itemName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: () => dispatch(actions.removeItem()),
    toggleDeletePopup: (e) => dispatch(actions.toggleDeletePopup(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(deletePopup);
