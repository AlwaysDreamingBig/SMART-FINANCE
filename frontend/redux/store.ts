import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage is localStorage for web
import sessionReducer from "./session/sessionSlice";
import userReducer from "./user/userSlice";

// ...

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
});

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {users: UsersState, sessions: SessionsState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Persistor for managing persistence
export const persistor = persistStore(store);
