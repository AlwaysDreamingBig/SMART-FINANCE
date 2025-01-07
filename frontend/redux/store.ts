import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session/sessionSlice";
import userReducer from "./user/userSlice";

// ...

export const store = configureStore({
  reducer: {
    // Add reducers here
    user: userReducer,
    session: sessionReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {users: UsersState, sessions: SessionsState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
