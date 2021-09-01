import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const logger = createLogger();
const middleWares = compose(applyMiddleware(thunk, logger));
const store = createStore(rootReducer, composeWithDevTools(middleWares));
export default store;
