import * as actionTypes from "./actionTypes";

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
