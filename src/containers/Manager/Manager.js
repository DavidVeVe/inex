import React, { Component } from "react";
import { connect } from "react-redux";

import "./Manager.css";

import * as actions from "../../store/actions";

import NewItemForm from "../NewItemForm/NewItemForm";
import ItemsList from "../../components/ItemsList/ItemsList";
import Description from "../../components/Description/Description";
import Modal from "../../components/UI/Modal/Modal";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import menuIcon from "../../assets/icons/menu.png";

class ItemsManager extends Component {
  state = {
    deleteItemName: "",
    uxDescription: "",
    selectedItemIndex: null,
  };

  itemDeleted = (index, e) => {
    e.stopPropagation();

    this.props.incomeVersion
      ? this.props.removeFromIncome(index)
      : this.props.removeFromExpense(index);

    this.props.toggleModalDeletePopup();
  };

  toggleDeletePopup = (index, e) => {
    e.stopPropagation();

    let itemName;

    if (this.props.incomeVersion) {
      itemName = this.props.incomeData[index];
    } else {
      itemName = this.props.expenseData[index];
    }

    this.setState({
      selectedItemIndex: index,
      deleteItemName: itemName,
    });

    this.props.toggleModalDeletePopup();
  };

  descriptionToggleHandler = (index) => {
    let description;

    if (this.props.incomeVersion) {
      description = this.props.incomeData[index];
    } else {
      description = this.props.expenseData[index];
    }

    this.setState({
      selectedItemIndex: index,
      uxDescription: description,
    });

    this.props.toggleModalDescription();
  };

  render() {
    const uxDescription = this.state.uxDescription;
    const deleteItemName = this.state.deleteItemName;

    return (
      <section className="expenseList__container">
        <DeletePopup
          togglePopup={this.toggleDeletePopup}
          itemDeleted={this.itemDeleted}
          itemIndex={this.state.selectedItemIndex}
          name={deleteItemName ? deleteItemName : {}}
        />
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
            clickClosed={this.props.toggleModalDescription}
          >
            <Description
              descriptionToggle={this.props.toggleModalDescription}
              descriptionValues={uxDescription ? uxDescription : {}}
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
        <ItemsList
          // totalAmount={total}
          descriptionToggle={this.descriptionToggleHandler}
          togglePopup={this.toggleDeletePopup}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    incomeData: state.form.incomeData,
    expenseData: state.form.expenseData,
    showModal: state.form.showModal,
    showDescription: state.modal.showDescription,
    form: state.form.form,
    incomeVersion: state.form.incomeVersion,
    editing: state.form.editing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromIncome: (index) => dispatch(actions.removeFromIncome(index)),
    removeFromExpense: (index) => dispatch(actions.removeFromExpense(index)),
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
    toggleModalDescription: () => dispatch(actions.toggleModalDescription()),
    toggleModalDeletePopup: () => dispatch(actions.toggleModalDeletePopup()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);
