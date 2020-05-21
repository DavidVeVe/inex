import * as actionTypes from "../actions/actionTypes";
import { updateObject, checkValidity } from "../../shared/utility";

const INITIAL_STATE = {
  incomedata: [],
  expensedata: [],
  form: {
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
};

const inputChanged = (state, action) => {
  action.payload.event.preventDefault();
  const updatedFormElement = updateObject(
    state.form[action.payload.identifier],
    {
      value: action.payload.event.target.value,
      valid: checkValidity(
        action.payload.event.target.value,
        state.form[action.payload.identifier].validation
      ),
      touched: true,
    }
  );

  const updatedNewItemForm = updateObject(state.form, {
    [action.payload.identifier]: updatedFormElement,
  });

  console.log(updatedNewItemForm);

  let formIsValid = true;

  for (let identifier in updatedNewItemForm) {
    formIsValid = updatedNewItemForm[identifier].valid && formIsValid;
  }

  return updateObject(state, {
    form: updatedNewItemForm,
    formIsValid: formIsValid,
  });
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FORM_RENDER:
      return state;
    case actionTypes.FORM_INPUT_CHANGED:
      return inputChanged(state, action);
    default:
      return state;
  }
};

export default formReducer;
