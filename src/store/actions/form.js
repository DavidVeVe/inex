import * as actionTypes from "./actionTypes";

export const toggleModalForm = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_FORM,
  };
};

export const toggleDeletePopup = (e, index) => {
  return {
    type: actionTypes.TOGGLE_DELETE_POPUP,
    payload: {
      event: e,
      index: index,
    },
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

export const removeItem = () => {
  return {
    type: actionTypes.REMOVE_ITEM,
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

export const showDescriptionInfo = (index) => {
  return {
    type: actionTypes.SHOW_DESCRIPTION,
    payload: {
      index: index,
    },
  };
};
