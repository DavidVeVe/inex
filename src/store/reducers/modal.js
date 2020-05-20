import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  showForm: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL_FORM:
      return { ...state, showForm: !state.showForm };
    default:
      return state;
  }
};

export default modalReducer;
