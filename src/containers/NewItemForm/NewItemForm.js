import React, { Component } from "react";
import { connect } from "react-redux";

import "./NewItemForm.css";
import * as actions from "../../store/actions";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class NewItemForm extends Component {
  addItemHandler = (e) => {
    if (this.props.incomeVersion) {
      this.props.addToIncome(e, this.props.form);
    } else {
      this.props.addToExpense(e, this.props.form);
    }

    this.props.toggleModalForm();
  };

  render() {
    const formElementsArray = [];

    for (let key in this.props.form) {
      formElementsArray.push({
        id: key,
        config: this.props.form[key],
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
                changed={(e) => this.props.inputFormChanged(e, formElement.id)}
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
    incomeData: state.form.incomeData,
    expenseData: state.form.expenseData,
    form: state.form.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToIncome: (e, itemData) => dispatch(actions.addToIncome(e, itemData)),
    removeFromIncome: (index) => dispatch(actions.removeFromIncome(index)),
    addToExpense: (e, itemData) => dispatch(actions.addToExpense(e, itemData)),
    removeFromExpense: (index) => dispatch(actions.removeFromExpense(index)),
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
    inputFormChanged: (e, identifier) =>
      dispatch(actions.inputFormChanged(e, identifier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
