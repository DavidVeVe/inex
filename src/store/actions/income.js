import * as actionTypes from "./actionTypes";

export const addToIncome = (itemData) => {
  return {
    type: actionTypes.ADD_ITEM_TO_INCOME,
    payload: {
      itemData: itemData,
    },
  };
};

export const removeFromIncome = (index) => {
  return {
    type: actionTypes.REMOVE_ITEM_FROM_INCOME,
    payload: {
      index: index,
    },
  };
};
