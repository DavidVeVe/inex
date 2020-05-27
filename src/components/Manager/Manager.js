import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Manager.css";

import * as actions from "../../store/actions";

import NewItemForm from "../NewItemForm/NewItemForm";
import ItemsList from "../ItemsList/ItemsList";
import Description from "../Description/Description";
import Modal from "../UI/Modal/Modal";
import DeletePopup from "../DeletePopup/DeletePopup";
import menuIcon from "../../assets/icons/menu.png";

const itemsManager = (props) => {
  let manager = (
    <section className="expenseList__container">
      <DeletePopup />
      {props.showModal ? (
        <Modal show={props.showModal} clickClosed={props.toggleModalForm}>
          <NewItemForm />
        </Modal>
      ) : (
        <Modal
          show={props.showDescription}
          clickClosed={props.showDescriptionInfo}
        >
          <Description
            showDescriptionInfo={props.showDescriptionInfo}
            descriptionData={props.descriptionData ? props.descriptionData : {}}
          />
        </Modal>
      )}
      <img
        className="menuIcon"
        onClick={props.menuClicked}
        src={menuIcon}
        alt="menu icon"
      />
      {props.incomeVersion ? (
        <h1>Gestor de ingresos</h1>
      ) : (
        <h1>Gestor de gastos</h1>
      )}
      <ItemsList
      // totalAmount={total}
      />
    </section>
  );

  if (!props.authenticated) {
    manager = <Redirect to="/" />;
  }

  return manager;
};

const mapStateToProps = (state) => {
  return {
    showModal: state.form.showModal,
    showDescription: state.form.showDescription,
    descriptionData: state.form.descriptionData,
    incomeVersion: state.form.incomeVersion,
    formIsValid: state.form.formIsValid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
    showDescriptionInfo: () => dispatch(actions.showDescriptionInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(itemsManager);
