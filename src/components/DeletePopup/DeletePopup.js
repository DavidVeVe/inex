import React from "react";
import { connect } from "react-redux";

import "./DeletePopup.css";

import * as actions from "../../store/actions";

import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";

const deletePopup = (props) => {
  const index = props.itemIndex;
  return (
    <Modal
      show={props.showDeletePopup}
      clickClosed={(e) => props.togglePopup(null, e)}
    >
      <div className="deletePopup__container">
        <p
          className="deletePopup__container-q"
          style={{ fontWeight: "bold", color: "#222222" }}
        >
          ¿Estas seguro que deseas eliminar este registro?
        </p>
        <p className="deletePopup__name">Nombre:</p>
        <p className="deletePopup__name-itemName">{props.name.itemName} </p>
        <div className="deletePopup__btns">
          <Button
            clicked={(event) => props.itemDeleted(index, event)}
            width="30%"
            color="white"
            btnType="add"
          >
            Eliminar
          </Button>
          <Button
            clicked={(e) => props.togglePopup(null, e)}
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
    showModal: state.form.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalDeletePopup: () => dispatch(actions.toggleModalDeletePopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(deletePopup);
