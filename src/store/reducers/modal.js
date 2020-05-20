import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  showForm: false,
  showDescription: false,
  showDeletePopup: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL_FORM:
      return { ...state, showForm: !state.showForm };
    case actionTypes.TOGGLE_MODAL_DESCRIPTION:
      return { ...state, showDescription: !state.showDescription };
    case actionTypes.TOGGLE_MODAL_DELETE_POPUP:
      return { ...state, showDeletePopup: !state.showDeletePopup };
    default:
      return state;
  }
};

export default modalReducer;
