import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  show: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      return { ...state, show: !state.show };
    default:
      return state;
  }
};

export default modalReducer;
