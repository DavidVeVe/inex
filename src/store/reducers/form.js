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
  showModal: false,
  incomeVersion: true,
  descriptionData: "",
  showDescription: false,
  showDeletePopup: false,
  itemName: "",
};

const setVersion = (state, action) => {
  return updateObject(state, { incomeVersion: !state.incomeVersion });
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

const addItem = (state, action) => {
  action.payload.event.preventDefault();

  let updatedForm = {};

  if (state.incomeVersion) {
    updatedForm = getFormData(action.payload.data);
    delete updatedForm.category;
  } else {
    updatedForm = getFormData(action.payload.data);
  }

  updatedForm.date = updatedForm.date.split("-").reverse().join("-");

  const newForm = clearForm(state.form, updateObject);

  if (state.editing && state.incomeVersion) {
    return updateObject(state, {
      incomeData: [
        ...state.incomeData.slice(0, state.itemIndex),
        updatedForm,
        ...state.incomeData.slice(state.itemIndex + 1),
      ],
      form: newForm,
      editing: false,
      showModal: false,
    });
  } else if (!state.editing && state.incomeVersion) {
    return updateObject(state, {
      incomeData: [...state.incomeData.slice(), updatedForm],
      form: newForm,
      editing: false,
      showModal: false,
    });
  } else if (state.editing && !state.incomeVersion) {
    return updateObject(state, {
      expenseData: [
        ...state.expenseData.slice(0, state.itemIndex),
        updatedForm,
        ...state.expenseData.slice(state.itemIndex + 1),
      ],
      form: newForm,
      editing: false,
      showModal: false,
    });
  } else {
    return updateObject(state, {
      expenseData: [...state.expenseData.slice(), updatedForm],
      form: newForm,
      editing: false,
      showModal: false,
    });
  }
};

export const removeItem = (state, action) => {
  if (state.incomeVersion) {
    return updateObject(state, {
      incomeData: [
        ...state.incomeData.slice(0, state.itemIndex),
        ...state.incomeData.slice(state.itemIndex + 1),
      ],
      showDeletePopup: !state.showDeletePopup,
    });
  } else {
    return updateObject(state, {
      expenseData: [
        ...state.expenseData.slice(0, state.itemIndex),
        ...state.expenseData.slice(state.itemIndex + 1),
      ],
      showDeletePopup: !state.showDeletePopup,
    });
  }
};

export const editItem = (state, action) => {
  action.payload.event.stopPropagation();

  let editableForm = {};

  if (state.incomeVersion) {
    for (let key in state.form) {
      editableForm[key] = updateObject(state.form[key], {
        value: state.incomeData[action.payload.index][key],
      });
    }
  } else {
    for (let key in state.form) {
      editableForm[key] = updateObject(state.form[key], {
        value: state.expenseData[action.payload.index][key],
      });
    }
  }

  return updateObject(state, {
    showModal: !state.showModal,
    form: editableForm,
    editing: true,
    itemIndex: action.payload.index,
  });
};

export const showDescriptionInfo = (state, action) => {
  let description;

  if (state.incomeVersion) {
    description = state.incomeData[action.payload.index];
  } else {
    description = state.expenseData[action.payload.index];
  }

  return updateObject(state, {
    showDescription: !state.showDescription,
    descriptionData: description,
  });
};

export const toggleDeletePopup = (state, action) => {
  action.payload.event.stopPropagation();

  let name;

  if (
    state.incomeData[action.payload.index] ||
    state.expenseData[action.payload.index]
  ) {
    state.incomeVersion
      ? (name = state.incomeData[action.payload.index].itemName)
      : (name = state.expenseData[action.payload.index].itemName);
  }

  return updateObject(state, {
    showDeletePopup: !state.showDeletePopup,
    itemIndex: action.payload.index,
    itemName: name,
  });
};

export const toggleModalForm = (state, action) => {
  const newForm = clearForm(state.form, updateObject);

  return updateObject(state, {
    showModal: !state.showModal,
    form: newForm,
    itemIndex: null,
  });
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FORM_RENDER:
      return { ...state };
    case actionTypes.SET_VERSION:
      return setVersion(state, action);
    case actionTypes.TOGGLE_MODAL_FORM:
      return toggleModalForm(state, action);
    case actionTypes.FORM_INPUT_CHANGED:
      return inputChanged(state, action);
    case actionTypes.ADD_ITEM:
      return addItem(state, action);
    case actionTypes.REMOVE_ITEM:
      return removeItem(state, action);
    case actionTypes.FORM_EDIT_ITEM:
      return editItem(state, action);
    case actionTypes.SHOW_DESCRIPTION:
      return showDescriptionInfo(state, action);
    case actionTypes.TOGGLE_DELETE_POPUP:
      return toggleDeletePopup(state, action);
    default:
      return state;
  }
};

export default formReducer;
