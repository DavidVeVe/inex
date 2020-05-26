import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      name: {
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
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isLogIn: false,
  };

  switchAuthModeHandler = () => {
    this.setState({ isLogIn: !this.state.isLogIn });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
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
          // changed={(e) =>}
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
          {this.state.isLogIn ? (
            <Button color="white" btnType="add2">
              Iniciar Sesión
            </Button>
          ) : (
            <Button color="white" btnType="add2">
              Crear Cuenta
            </Button>
          )}
          {this.state.isLogIn ? (
            <span
              onClick={this.switchAuthModeHandler}
              className={classes.logInBtn}
            >
              Crear Cuenta
            </span>
          ) : (
            <span
              onClick={this.switchAuthModeHandler}
              className={classes.logInBtn}
            >
              Iniciar Sesion
            </span>
          )}
        </form>
      </section>
    );
  }
}

export default Auth;
