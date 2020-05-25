import React from "react";
import { connect } from "react-redux";

import "./NewItemForm.css";
import * as actions from "../../store/actions";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const newItemForm = (props) => {
  const formElementsArray = [];

  for (let key in props.form) {
    formElementsArray.push({
      id: key,
      config: props.form[key],
    });
  }

  let form = (
    <form className="newExpense__form">
      {formElementsArray.map((formElement) => {
        if (props.incomeVersion && formElement.id === "category") {
          return null;
        } else {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              changed={(e) => props.inputFormChanged(e, formElement.id)}
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
          disabled={!props.formIsValid}
          color="white"
          btnType="add"
          clicked={(e) => props.addItem(e, props.form)}
        >
          Guardar
        </Button>
        <Button
          color="white"
          btnType="cancel"
          type="button"
          clicked={props.toggleModalForm}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
  return form;
};

const mapStateToProps = (state) => {
  return {
    form: state.form.form,
    incomeVersion: state.form.incomeVersion,
    formIsValid: state.form.formIsValid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (e, data) => dispatch(actions.addItem(e, data)),
    toggleModalForm: () => dispatch(actions.toggleModalForm()),
    inputFormChanged: (e, identifier) =>
      dispatch(actions.inputFormChanged(e, identifier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(newItemForm);
