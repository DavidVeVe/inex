import * as actionTypes from "./actionTypes";

export const inputAuthFormChanged = (event, identifier) => {
  return {
    type: actionTypes.AUTH_FORM_INPUT_CHANGED,
    payload: {
      event: event,
      identifier: identifier,
    },
  };
};
