import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit"; // Import combineReducers
import userReducer from "./slices/user.slice";
import styleReducer from "./slices/styles.slice";

// Create a persist config
const persistConfig = {
  key: "root", // Key for storage
  storage, // Storage method
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  style: styleReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
