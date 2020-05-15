import * as actionTypes from "./actionTypes";

export const addToExpense = (itemData) => {
  return {
    type: actionTypes.ADD_ITEM_TO_EXPENSE,
    payload: {
      itemData: itemData,
    },
  };
};

export const removeFromExpense = (index) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_EXPENSE,
    payload: {
      index: index,
    },
  };
};
