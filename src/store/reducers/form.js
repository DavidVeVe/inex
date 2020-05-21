import * as actionTypes from "../actions/actionTypes";
import {
  updateObject,
  checkValidity,
  clearForm,
  getFormData,
} from "../../shared/utility";

const INITIAL_STATE = {
  incomeData: [],
  expenseData: [],
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
  editing: false,
  itemIndex: null,
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

  let formIsValid = true;

  for (let identifier in updatedNewItemForm) {
    formIsValid = updatedNewItemForm[identifier].valid && formIsValid;
  }

  return updateObject(state, {
    form: updatedNewItemForm,
    formIsValid: formIsValid,
  });
};

const addToIncome = (state, action) => {
  action.payload.event.preventDefault();

  const updatedForm = getFormData(action.payload.itemData);

  delete updatedForm.category;

  const newForm = clearForm(state.form, updateObject);

  if (state.editing) {
    return updateObject(state, {
      incomeData: [
        ...state.incomeData.slice(0, state.itemIndex),
        updatedForm,
        ...state.incomeData.slice(state.itemIndex + 1),
      ],
      form: newForm,
      editing: false,
    });
  } else {
    return updateObject(state, {
      incomeData: [...state.incomeData.slice(), updatedForm],
      form: newForm,
      editing: false,
    });
  }
};

const removeFromIncome = (state, action) => {
  return updateObject(state, {
    incomeData: [
      ...state.incomeData.slice(0, action.payload.index),
      ...state.incomeData.slice(action.payload.index + 1),
    ],
  });
};

const addToExpense = (state, action) => {
  action.payload.event.preventDefault();

  const updatedForm = getFormData(action.payload.itemData);

  const newForm = clearForm(state.form, updateObject);

  if (state.editing) {
    return updateObject(state, {
      expenseData: [
        ...state.expenseData.slice(0, state.itemIndex),
        updatedForm,
        ...state.expenseData.slice(state.itemIndex + 1),
      ],
      form: newForm,
      editing: false,
    });
  } else {
    return updateObject(state, {
      expenseData: [...state.expenseData.slice(), updatedForm],
      form: newForm,
      editing: false,
    });
  }
};

const removeFromExpense = (state, action) => {
  return updateObject(state, {
    expenseData: [
      ...state.expenseData.slice(0, action.payload.index),
      ...state.expenseData.slice(action.payload.index + 1),
    ],
  });
};

const editItem = (state, action) => {
  action.payload.event.stopPropagation();

  let editableForm = {};

  for (let key in state.form) {
    editableForm[key] = updateObject(state.form[key], {
      value: action.payload.data[action.payload.index][key],
    });
  }

  return updateObject(state, {
    form: editableForm,
    editing: true,
    itemIndex: action.payload.index,
  });
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FORM_RENDER:
      return { ...state };
    case actionTypes.FORM_INPUT_CHANGED:
      return inputChanged(state, action);
    case actionTypes.ADD_ITEM_TO_INCOME:
      return addToIncome(state, action);
    case actionTypes.REMOVE_ITEM_FROM_INCOME:
      return removeFromIncome(state, action);
    case actionTypes.ADD_ITEM_TO_EXPENSE:
      return addToExpense(state, action);
    case actionTypes.REMOVE_ITEM_FROM_EXPENSE:
      return removeFromExpense(state, action);
    case actionTypes.FORM_EDIT_ITEM:
      return editItem(state, action);
    default:
      return state;
  }
};

export default formReducer;
