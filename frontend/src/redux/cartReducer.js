import { ADD_TO_CART, REMOVE_FROM_CART } from "./constant";

const cart = [];
const cartReducerComp = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case ADD_TO_CART:
      // Check if Product is Already Exist
      const exist = state.find((x) => x._id === product._id);
      if (exist) {
        // Increase the Quantity
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        const product = action.payload;
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }

    case REMOVE_FROM_CART:
      const exist1 = state.find((x) => x._id === product._id);
      if (exist1.qty === 1) {
        return state.filter((x) => x._id !== exist1._id);
      } else {
        return state.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty - 1 } : x
        );
      }

    default:
      return state;
  }
};

export default cartReducerComp;
