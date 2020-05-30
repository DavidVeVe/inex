import axios from "../../axios-manager";
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

export const addItemStart = () => {
  return {
    type: actionTypes.ADD_ITEM_START,
  };
};

export const addItemSuccess = (id, itemData) => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
    payload: {
      itemId: id,
      itemData: itemData,
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

export const addItemFail = (error) => {
  return {
    type: actionTypes.ADD_ITEM_FAIL,
    payload: {
      error: error,
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

export const addNewItem = (itemData) => {
  return (dispatch) => {
    dispatch(addItemStart());

    axios
      .post("/items.json", itemData)
      .then((response) => {
        dispatch(addItemSuccess(response.payload.name, itemData));
      })
      .catch((error) => {
        dispatch(addItemFail(error));
      });
  };
};
