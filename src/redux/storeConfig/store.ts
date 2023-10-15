import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
 