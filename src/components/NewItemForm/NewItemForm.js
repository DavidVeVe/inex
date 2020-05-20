import React, { Component } from "react";
import { connect } from "react-redux";

import "./NewItemForm.css";
import { updateObject, checkValidity } from "../../shared/utility";
import * as actions from "../../store/actions";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

class NewItemForm extends Component {
  state = {
    newItemForm: {
      itemName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nombre",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      category: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Comida", displayValue: "Comida" },
            { value: "Salud", displayValue: "Salud" },
            { value: "Servicios", displayValue: "Servicios" },
            { value: "Transporte", displayValue: "Transporte" },
            { value: "Otro", displayValue: "Otro" },
          ],
        },
        value: "Comida",
        validation: {},
        valid: true,
      },
      amount: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Monto",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      date: {
        elementType: "input",
        elementConfig: {
          type: "date",
          placeholder: "Fecha",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        elementType: "textarea",
        elementConfig: {
          type: "text",
          placeholder: "Descripción",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    show: false,
  };

  addItemHandler = (e) => {
    e.preventDefault();

    let updatedForm = {};

    for (let key in this.state.newItemForm) {
      updatedForm[key] = this.state.newItemForm[key].value;
    }

    if (this.props.incomeVersion) {
      delete updatedForm.category;
      this.props.addToIncome(updatedForm);
    } else {
      this.props.addToExpense(updatedForm);
    }

    console.log(updatedForm);
    this.props.toggleModalForm();

    console.log("item added");
  };

  inputChangedHandler = (e, identifier) => {
    const updatedFormElement = updateObject(
      this.state.newItemForm[identifier],
      {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.newItemForm[identifier].validation
        ),
        touched: true,
      }
    );

    const updatedNewItemForm = updateObject(this.state.newItemForm, {
      [identifier]: updatedFormElement,
    });

    let formIsValid = true;

    for (let identifier in updatedNewItemForm) {
      formIsValid = updatedNewItemForm[identifier].valid && formIsValid;
    }

    this.setState({
      newItemForm: updatedNewItemForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.newItemForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newItemForm[key],
      });
    }

    let form = (
      <form className="newExpense__form" onSubmit={this.addItemHandler}>
        {formElementsArray.map((formElement) => {
          if (this.props.incomeVersion && formElement.id === "category") {
            return null;
          } else {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                changed={(e) => this.inputChangedHandler(e, formElement.id)}
                value={formElement.config.value}
              />
            );
          }
        })}
        <div className="newExpense__btnWrapper">
          <Button color="white" btnType="add" clicked={this.addItemHandler}>
            Guardar
          </Button>
          <Button
            color="white"
            btnType="cancel"
            type="button"
            clicked={this.props.toggleModalForm}
          >
            Cancelar
          </Button>
        </div>
      </form>
    );
    return form;
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
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
