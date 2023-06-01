import { ADD_TO_CART, REMOVE_FROM_CART } from "./constant";

// action file here

export const addItem = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeItem = (product) => {
  return {
    type: REMOVE_FROM_CART,
    payload: product,
  };
};
