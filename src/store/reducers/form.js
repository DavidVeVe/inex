import * as actionTypes from "../actions/actionTypes";

import { updateObject, clearForm } from "../../shared/utility";

const INITIAL_STATE = {
  incomeData: [],
  expenseData: [],
  editing: false,
  itemIndex: null,
  formIsValid: false,
  showModal: false,
  incomeVersion: true,
  descriptionData: "",
  showDescription: false,
  showDeletePopup: false,
  itemName: "",
  error: null,
  loading: false,
};

const setVersion = (state, action) => {
  return updateObject(state, { incomeVersion: !state.incomeVersion });
};

export const addItemSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    incomeData: state.incomeData.concat(action.payload),
  });
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
    case actionTypes.ADD_ITEM_SUCCESS:
      return addItemSuccess(state, action);
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
