import * as actionTypes from "./actionTypes";

export const toggleModalForm = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_FORM,
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

export const addToIncome = (event, itemData, index) => {
  return {
    type: actionTypes.ADD_ITEM_TO_INCOME,
    payload: {
      event: event,
      itemData: itemData,
      index: index,
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

export const addToExpense = (event, itemData) => {
  return {
    type: actionTypes.ADD_ITEM_TO_EXPENSE,
    payload: {
      event: event,
      itemData: itemData,
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

export const editItem = (index, event, data) => {
  return {
    type: actionTypes.FORM_EDIT_ITEM,
    payload: {
      event: event,
      index: index,
      data: data,
    },
  };
};
