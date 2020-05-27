import * as actionTypes from "../actions/actionTypes";

import { updateObject, checkValidity } from "../../shared/utility";

const INITIAL_STATE = {
  authForm: {
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
  formIsValid: false,
};

const inputAuthFormChanged = (state, action) => {
  action.payload.event.preventDefault();

  const updatedFormElement = updateObject(
    state.authForm[action.payload.identifier],
    {
      value: action.payload.event.target.value,
      valid: checkValidity(
        action.payload.event.target.value,
        state.authForm[action.payload.identifier].validation
      ),
      touched: true,
    }
  );

  const updatedAuthForm = updateObject(state.authForm, {
    [action.payload.identifier]: updatedFormElement,
  });

  let formIsValid = true;

  for (let identifier in updatedAuthForm) {
    formIsValid = updatedAuthForm[identifier].valid && formIsValid;
  }

  return updateObject(state, {
    authForm: updatedAuthForm,
    formIsValid: formIsValid,
  });
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FORM_RENDER:
      return { ...state };
    case actionTypes.AUTH_FORM_INPUT_CHANGED:
      return inputAuthFormChanged(state, action);
    default:
      return state;
  }
};

export default authReducer;
