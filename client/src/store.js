import { createStore, applyMiddleware } from "redux";
import { composewithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "";

const initialState = {};

const middleware = { thunk };

const store = createStore(
  rootReducer,
  initialState,
  composewithDevTools(applyMiddleware(...middleware))
);

export default store;
  