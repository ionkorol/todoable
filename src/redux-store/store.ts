import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  userReducer,
  modalsReducer,
  selectedReducer,
} from "redux-store/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  selected: selectedReducer,
  modals: modalsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
