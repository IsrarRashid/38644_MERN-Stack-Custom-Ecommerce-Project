// root reducer here
import { combineReducers } from "redux";
import cartReducerComp from "./cartReducer";

const rootRed = combineReducers({
  cardRed: cartReducerComp,
});

export default rootRed;
