import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import "./Manager.css";

import NewItemForm from "../../components/NewItemForm/NewItemForm";
import ItemsList from "../../components/ItemsList/ItemsList";
import Description from "../../components/Description/Description";
import Modal from "../../components/UI/Modal/Modal";
import DeletePopup from "../../components/DeletePopup/DeletePopup";
import menuIcon from "../../assets/icons/menu.png";

const categories = ["Comida", "Salud", "Servicios", "Transporte", "Otro"];

class ItemsManager extends Component {
  constructor(props) {
    super(props);
    this.category = React.createRef();
  }

  state = {
    expenseForm: {
      itemName: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    },
    incomeForm: {
      itemName: "",
      amount: "",
      date: "",
      description: "",
    },
    editable: false,
    formValidation: true,
    deleteItemName: "",
    uxDescription: "",
    // categories: ["Comida", "Salud", "Servicios", "Transporte", "Otro"],
    show: false,
    showDescription: false,
    showDeletePopup: false,
    selectedItemIndex: null,
  };

  itemAdder = (e) => {
    e.preventDefault();

    this.props.incomeVersion
      ? this.props.addToIncome(this.state.incomeForm)
      : this.props.addToExpense(this.state.expenseForm);

    this.setState({ show: false });

    // if (
    //   (this.state.incomeForm.itemName.length !== 0 &&
    //     this.state.incomeForm.date.length !== 0 &&
    //     this.state.incomeForm.amount.length !== 0) ||
    //   (this.state.expenseForm.itemName.length !== 0 &&
    //     this.state.expenseForm.category.length !== 0 &&
    //     this.state.expenseForm.date.length !== 0 &&
    //     this.state.expenseForm.amount.length !== 0)
    // ) {
    //   this.setState((prevState) => {
    //     const incomeData = [...prevState.data.income];
    //     const expenseData = [...prevState.data.expense];

    //     if (this.props.incomeVersion && this.state.editable) {
    //       incomeData[this.state.selectedItemIndex] = this.state.incomeForm;
    //     } else if (this.props.incomeVersion) {
    //       incomeData.push(this.state.incomeForm);
    //     } else if (!this.props.incomeVersion && this.state.editable) {
    //       expenseData[this.state.selectedItemIndex] = this.state.expenseForm;
    //     } else {
    //       expenseData.push(this.state.expenseForm);
    //     }

    //     return {
    //       data: {
    //         income: incomeData,
    //         expense: expenseData,
    //       },
    //       incomeForm: {
    //         itemName: "",
    //         amount: "",
    //         date: "",
    //         description: "",
    //       },
    //       expenseForm: {
    //         itemName: "",
    //         amount: "",
    //         date: "",
    //         category: "",
    //         description: "",
    //       },
    //       formValidation: true,
    //       show: false,
    //     };
    //   });
    // } else {
    //   this.setState((prevState) => {
    //     return {
    //       show: prevState.show,
    //       formValidation: false,
    //     };
    //   });
    // }
  };

  itemChanged = ({ target }) => {
    if (this.props.incomeVersion) {
      this.setState({
        incomeForm: {
          ...this.state.incomeForm,
          [target.name]: target.value,
        },
        formValidation: true,
      });
    } else {
      this.setState({
        expenseForm: {
          ...this.state.expenseForm,
          [target.name]: target.value,
        },
        formValidation: true,
      });
    }
  };

  itemDeleted = (index, e) => {
    e.stopPropagation();

    this.props.incomeVersion
      ? this.props.removeFromIncome(index)
      : this.props.removeFromExpense(index);

    this.setState({ showDeletePopup: false });
    
    // this.setState((prevState) => {
    //   const incomeData = [...prevState.data.income];
    //   const expenseData = [...prevState.data.expense];
    //   if (this.props.incomeVersion) {
    //     incomeData.splice(index, 1);
    //   } else {
    //     expenseData.splice(index, 1);
    //   }

    //   return {
    //     data: {
    //       income: incomeData,
    //       expense: expenseData,
    //     },
    //     incomeForm: {
    //       itemName: "",
    //       amount: "",
    //       date: "",
    //       description: "",
    //     },
    //     expenseForm: {
    //       itemName: "",
    //       amount: "",
    //       date: "",
    //       category: "",
    //       description: "",
    //     },
    //     showDeletePopup: false,
    //   };
    // });
  };

  itemEdited = (index, e) => {
    e.stopPropagation();

    const incomeData = [...this.props.incomeData];
    const expenseData = [...this.props.expenseData];

    this.setState((prevState) => {
      if (this.props.incomeVersion) {
        return {
          incomeForm: {
            itemName: incomeData[index].itemName,
            amount: incomeData[index].amount,
            date: incomeData[index].date,
            description: incomeData[index].description,
          },
          editable: true,
          show: true,
          selectedItemIndex: index,
        };
      } else {
        return {
          expenseForm: {
            itemName: expenseData[index].itemName,
            amount: expenseData[index].amount,
            date: expenseData[index].date,
            category: expenseData[index].category,
            description: expenseData[index].description,
          },
          editable: true,
          show: true,
          selectedItemIndex: index,
        };
      }
    });
  };

  modalToggleHandler = (e) => {
    e.preventDefault();

    const modal = this.state.show;

    this.setState({
      show: !modal,
      incomeForm: {
        itemName: "",
        amount: "",
        date: "",
        description: "",
      },
      expenseForm: {
        itemName: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      },
      editable: false,
      formValidation: true,
      selectedItemIndex: null,
    });
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
    const uxDescription = this.state.uxDescription;
    const deleteItemName = this.state.deleteItemName;

    let totalData;
    if (this.props.incomeVersion) {
      totalData = this.props.incomeData;
    } else {
      totalData = this.props.expenseData;
    }

    const total = totalData
      .map((item) => {
        return parseInt(item.amount);
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return (
      <section className="expenseList__container">
        <DeletePopup
          showPopup={this.state.showDeletePopup}
          togglePopup={this.toggleDeletePopup}
          itemDeleted={this.itemDeleted}
          itemIndex={this.state.selectedItemIndex}
          name={deleteItemName ? deleteItemName : {}}
        />
        {this.state.show ? (
          <Modal show={this.state.show} clickClosed={this.modalToggleHandler}>
            <NewItemForm
              incomeVersion={this.props.incomeVersion}
              clickClosed={this.modalToggleHandler}
              clicked={this.itemAdder}
              changed={this.itemChanged}
              values={
                this.props.incomeVersion
                  ? this.state.incomeForm
                  : this.state.expenseForm
              }
              options={categories}
              reference={this.category}
              formValidated={this.state.formValidation}
            />
          </Modal>
        ) : (
          <Modal
            show={this.state.showDescription}
            clickClosed={this.descriptionToggleHandler}
          >
            <Description
              descriptionToggle={this.descriptionToggleHandler}
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
          totalAmount={total}
          descriptionToggle={this.descriptionToggleHandler}
          clickedOpened={this.modalToggleHandler}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToIncome: (itemData) => dispatch(actions.addToIncome(itemData)),
    removeFromIncome: (index) => dispatch(actions.removeFromIncome(index)),
    addToExpense: (itemData) => dispatch(actions.addToExpense(itemData)),
    removeFromExpense: (index) => dispatch(actions.removeFromExpense(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsManager);
