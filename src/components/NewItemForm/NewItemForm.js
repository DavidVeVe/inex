import React, { Component } from "react";
import { connect } from "react-redux";

import "./NewItemForm.css";
import * as actions from "../../store/actions";
import {
  updateObject,
  checkValidity,
  getFormData,
  clearForm,
} from "../../shared/utility";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

class newItemForm extends Component {
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
            { value: "", displayValue: "-- categoría --" },
            { value: "Comida", displayValue: "Comida" },
            { value: "Salud", displayValue: "Salud" },
            { value: "Servicios", displayValue: "Servicios" },
            { value: "Transporte", displayValue: "Transporte" },
            { value: "Otro", displayValue: "Otro" },
          ],
        },
        value: "",
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
        validation: {},
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
  };

  inputChanged = (e, identifier) => {
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

  addNewItemHandler = (e) => {
    e.preventDefault();

    let updatedForm = {};

    if (this.props.incomeVersion) {
      updatedForm = getFormData(this.state.newItemForm);
      delete updatedForm.category;
    } else {
      updatedForm = getFormData(this.state.newItemForm);
    }

    updatedForm.date = updatedForm.date.split("-").reverse().join("/");

    const newForm = clearForm(this.state.newItemForm, updateObject);

    let type;
    this.props.incomeVersion ? (type = "income") : (type = "expense");

    const item = {
      itemData: updatedForm,
      userId: this.props.userId,
      type: type,
    };

    this.props.onAddNewItem(item);
    this.props.toggleModalForm();
    this.setState({ newItemForm: newForm });

    // if (this.props.editing && this.props.incomeVersion) {
    //   return updateObject(state, {
    //     incomeData: [
    //       ...state.incomeData.slice(0, state.itemIndex),
    //       updatedForm,
    //       ...state.incomeData.slice(state.itemIndex + 1),
    //     ],
    //     form: newForm,
    //     editing: false,
    //     showModal: false,
    //   });
    // } else if (!this.props.editing && this.props.incomeVersion) {
    //   return updateObject(state, {
    //     incomeData: [...state.incomeData.slice(), updatedForm],
    //     form: newForm,
    //     editing: false,
    //     showModal: false,
    //   });
    // } else if (this.props.editing && !this.props.incomeVersion) {
    //   return updateObject(state, {
    //     expenseData: [
    //       ...state.expenseData.slice(0, state.itemIndex),
    //       updatedForm,
    //       ...state.expenseData.slice(state.itemIndex + 1),
    //     ],
    //     form: newForm,
    //     editing: false,
    //     showModal: false,
    //   });
    // } else {
    //   return updateObject(state, {
    //     expenseData: [...state.expenseData.slice(), updatedForm],
    //     form: newForm,
    //     editing: false,
    //     showModal: false,
    //   });
    // }
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
      <form className="newExpense__form">
        {formElementsArray.map((formElement) => {
          if (this.props.incomeVersion && formElement.id === "category") {
            return null;
          } else {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                changed={(e) => this.inputChanged(e, formElement.id)}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                valueType={formElement.id}
                touched={formElement.config.touched}
              />
            );
          }
        })}
        <div className="newExpense__btnWrapper">
          <Button
            disabled={!this.state.formIsValid}
            color="white"
            btnType="add2"
            clicked={(e) => this.addNewItemHandler(e)}
          >
            Guardar
          </Button>
          <Button
            color="#b95023"
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
    form: state.form.form,
    incomeVersion: state.form.incomeVersion,
    formIsValid: state.form.formIsValid,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNewItem: (e) => dispatch(actions.addNewItem(e)),
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(newItemForm);
