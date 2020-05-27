import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    isLogIn: true,
  };
  switchAuthModeHandler = () => {
    this.setState({ isLogIn: !this.state.isLogIn });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.props.authForm) {
      formElementsArray.push({
        id: key,
        config: this.props.authForm[key],
      });
    }

    let form = formElementsArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shoulValidate={formElement.config.validation}
          touched={formElement.config.touched}
          valueType={formElement.id}
          changed={(e) => this.props.inputAuthFormChanged(e, formElement.id)}
        />
      );
    });

    if (this.state.isLogIn) {
      delete form[0];
    }

    return (
      <section className={classes.formContainer}>
        <form>
          {form}
          <Button color="white" btnType="add2">
            {this.state.isLogIn ? "Iniciar Sesión" : "Crear Cuenta"}
          </Button>
          <span
            onClick={this.switchAuthModeHandler}
            className={classes.logInBtn}
          >
            {this.state.isLogIn ? "Crear Cuenta" : "Iniciar Sesión"}
          </span>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authForm: state.auth.authForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputAuthFormChanged: (e, identifier) =>
      dispatch(actions.inputAuthFormChanged(e, identifier)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
