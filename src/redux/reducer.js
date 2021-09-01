import { combineReducers } from "redux";
import loginSignUp from "./loginSignUpSlice";
import products from "./productSlice";
import user from "./userSlice";

const rootReducer = combineReducers({
  loginSignUp,
  products,
  user,
});

export default rootReducer;
