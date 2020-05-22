import React, { Component } from "react";
import { connect } from "react-redux";

import "./NewItemForm.css";
import * as actions from "../../store/actions";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class NewItemForm extends Component {
  render() {
    const formElementsArray = [];

    for (let key in this.props.form) {
      formElementsArray.push({
        id: key,
        config: this.props.form[key],
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
                changed={(e) => this.props.inputFormChanged(e, formElement.id)}
                value={formElement.config.value}
              />
            );
          }
        })}
        <div className="newExpense__btnWrapper">
          <Button
            color="white"
            btnType="add"
            clicked={(e) => this.props.addItem(e, this.props.form)}
          >
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
    form: state.form.form,
    incomeVersion: state.form.incomeVersion,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewItemForm);
