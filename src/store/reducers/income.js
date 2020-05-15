import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INITIAL_STATE = {
  data: [],
};

const managerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_INCOME:
      return updateObject(state, {
        data: [...state.data.slice(), action.payload.itemData],
      });
    case actionTypes.REMOVE_ITEM_FROM_INCOME:
      return updateObject(state, {
        data: [
          ...state.data.slice(0, action.payload.index),
          ...state.data.slice(action.payload.index + 1),
        ],
      });
    default:
      return state;
  }
};

export default managerReducer;
