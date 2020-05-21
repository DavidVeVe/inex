import * as actionTypes from "./actionTypes";

export const inputFormChanged = (e, identifier) => {
  return {
    type: actionTypes.FORM_INPUT_CHANGED,
    payload: {
      event: e,
      identifier: identifier,
    },
  };
};
