import * as actionTypes from "./actionTypes";

export const toggleModalForm = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_FORM,
  };
};

export const setVersion = () => {
  return {
    type: actionTypes.SET_VERSION,
  };
};

export const inputFormChanged = (event, identifier) => {
  return {
    type: actionTypes.FORM_INPUT_CHANGED,
    payload: {
      event: event,
      identifier: identifier,
    },
  };
};

export const addItem = (event, data) => {
  return {
    type: actionTypes.ADD_ITEM,
    payload: {
      event: event,
      data: data,
    },
  };
};

export const removeFromIncome = (index) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_INCOME,
    payload: {
      index: index,
    },
  };
};

export const removeFromExpense = (index) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_EXPENSE,
    payload: {
      index: index,
    },
  };
};

export const editItem = (index, event) => {
  return {
    type: actionTypes.FORM_EDIT_ITEM,
    payload: {
      event: event,
      index: index,
    },
  };
};
