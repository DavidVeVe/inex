import * as actionTypes from "../actions/actionTypes";

import { updateObject, checkValidity, clearForm } from "../../shared/utility";

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
  error: null,
  errorMessage: null,
  token: null,
  userId: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const inputAuthFormChanged = (state, action) => {
  const updatedAuthForm = updateObject(state.authForm, {
    [action.payload.identifier]: updateObject(
      state.authForm[action.payload.identifier],
      {
        value: action.payload.event.target.value,
        valid: checkValidity(
          action.payload.event.target.value,
          state.authForm[action.payload.identifier].validation
        ),
        touched: true,
      }
    ),
  });

  return updateObject(state, {
    authForm: updatedAuthForm,
  });
};

const authSuccess = (state, action) => {
  const newForm = clearForm(state.authForm, updateObject);
  return updateObject(state, {
    token: action.payload.token,
    userId: action.payload.userId,
    error: null,
    loading: false,
    authForm: newForm,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    errorMessage: action.payload.errorMessage,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.payload.path,
  });
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FORM_RENDER:
      return { ...state };
    case actionTypes.AUTH_FORM_INPUT_CHANGED:
      return inputAuthFormChanged(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default authReducer;
