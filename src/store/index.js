import { createStore, compose } from "redux";
import rootReducers from "../reducers";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const presistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(presistConfig, rootReducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers());
const persistor = persistStore(store);

export { persistor };
export default store;
