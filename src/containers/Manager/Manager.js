import React, { Component } from "react";
import { connect } from "react-redux";

import "./Manager.css";

import * as actions from "../../store/actions";

import NewItemForm from "../../components/NewItemForm/NewItemForm";
import ItemsList from "../../components/ItemsList/ItemsList";
import Description from "../../components/Description/Description";
import Modal from "../../components/UI/Modal/Modal";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import menuIcon from "../../assets/icons/menu.png";

const categories = ["Comida", "Salud", "Servicios", "Transporte", "Otro"];

class ItemsManager extends Component {
  state = {
    editable: false,
    deleteItemName: "",
    uxDescription: "",
    showDescription: false,
    showDeletePopup: false,
    selectedItemIndex: null,
  };

  // itemChanged = ({ target }) => {
  //   if (this.props.incomeVersion) {
  //     this.setState({
  //       incomeForm: {
  //         ...this.state.incomeForm,
  //         [target.name]: target.value,
  //       },
  //       formValidation: true,
  //     });
  //   } else {
  //     this.setState({
  //       expenseForm: {
  //         ...this.state.expenseForm,
  //         [target.name]: target.value,
  //       },
  //       formValidation: true,
  //     });
  //   }
  // };

  itemDeleted = (index, e) => {
    e.stopPropagation();

    this.props.incomeVersion
      ? this.props.removeFromIncome(index)
      : this.props.removeFromExpense(index);

    this.setState({ showDeletePopup: false });
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
      showDeletePopup: !this.state.showDeletePopup,
      selectedItemIndex: index,
      deleteItemName: itemName,
    });
  };

  descriptionToggleHandler = (index) => {
    let description;

    if (this.props.incomeVersion) {
      description = this.props.incomeData[index];
    } else {
      description = this.props.expenseData[index];
    }

    this.setState({
      showDescription: !this.state.showDescription,
      selectedItemIndex: index,
      uxDescription: description,
    });
  };

  render() {
    console.log(this.props.showDescription);
    const uxDescription = this.state.uxDescription;
    const deleteItemName = this.state.deleteItemName;

    return (
      <section className="expenseList__container">
        <DeletePopup
          showPopup={this.state.showDeletePopup}
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
            <NewItemForm
              incomeVersion={this.props.incomeVersion}
              // clickClosed={this.modalToggleHandler}
              addItem={this.addItemHandler}
              changed={this.itemChanged}
              options={categories}
            />
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
          alt=""
        />
        {this.props.incomeVersion ? (
          <h1>Gestor de ingresos</h1>
        ) : (
          <h1>Gestor de gastos</h1>
        )}
        <ItemsList
          // totalAmount={total}
          descriptionToggle={this.props.toggleModalDescription}
          itemsValues={
            this.props.incomeVersion
              ? this.props.incomeData
              : this.props.expenseData
          }
          version={this.props.incomeVersion}
          clickedEdited={this.itemEdited}
          itemDeleted={this.itemDeleted}
          togglePopup={this.toggleDeletePopup}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    incomeData: state.income.data,
    expenseData: state.expense.data,
    showModal: state.modal.showForm,
    showDescription: state.modal.showDescription,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromIncome: (index) => dispatch(actions.removeFromIncome(index)),
    removeFromExpense: (index) => dispatch(actions.removeFromExpense(index)),
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
    toggleModalDescription: () => dispatch(actions.toggleModalDescription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);
