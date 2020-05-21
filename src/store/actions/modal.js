import * as actionTypes from "./actionTypes";

export const toggleModalForm = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_FORM,
  };
};

export const toggleModalDescription = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_DESCRIPTION,
  };
};

export const toggleModalDeletePopup = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_DELETE_POPUP,
  };
};

export const toggleModalEditForm = () => {
  return {
    type: actionTypes.TOGGLE_MODAL_EDIT_FORM,
  };
};
