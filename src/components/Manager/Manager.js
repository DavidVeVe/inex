import React, { Component } from "react";
import { connect } from "react-redux";

import "./Manager.css";

import * as actions from "../../store/actions";

import NewItemForm from "../NewItemForm/NewItemForm";
import ItemsList from "../ItemsList/ItemsList";
import Description from "../Description/Description";
import Modal from "../UI/Modal/Modal";
import DeletePopup from "../DeletePopup/DeletePopup";
import menuIcon from "../../assets/icons/menu.png";

class ItemsManager extends Component {
  componentDidMount() {
    this.props.onFetchItems(this.props.token, this.props.userId);
  }

  render() {
    return (
      <section className="expenseList__container">
        <DeletePopup />
        {this.props.showModal ? (
          <Modal
            show={this.props.showModal}
            clickClosed={this.props.toggleModalForm}
          >
            <NewItemForm />
          </Modal>
        ) : (
          <Modal
            show={this.props.showDescription}
            clickClosed={this.props.showDescriptionInfo}
          >
            <Description
              showDescriptionInfo={this.props.showDescriptionInfo}
              descriptionData={
                this.props.descriptionData ? this.props.descriptionData : {}
              }
            />
          </Modal>
        )}
        <img
          className="menuIcon"
          onClick={this.props.menuClicked}
          src={menuIcon}
          alt="menu icon"
        />
        {this.props.incomeVersion ? (
          <h1>Gestor de ingresos</h1>
        ) : (
          <h1>Gestor de gastos</h1>
        )}
        <ItemsList />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showModal: state.form.showModal,
    showDescription: state.form.showDescription,
    descriptionData: state.form.descriptionData,
    incomeVersion: state.form.incomeVersion,
    formIsValid: state.form.formIsValid,
    authenticated: state.auth.token !== null,
    token: state.auth.token,
    incomeData: state.form.incomeData,
    expenseData: state.form.expenseData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
    showDescriptionInfo: () => dispatch(actions.showDescriptionInfo()),
    onFetchItems: (token, userId) =>
      dispatch(actions.fetchItems(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);
