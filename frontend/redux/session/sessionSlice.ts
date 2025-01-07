import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface SessionState {
  isAuthenticated: boolean;
  sessionToken: string | null; // JWT or session token
  error: string | null;
}

const initialState: SessionState = {
  isAuthenticated: false,
  sessionToken: null,
  error: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startSession: (
      state,
      action: PayloadAction<{ sessionToken: string; sessionExpiry: string }>
    ) => {
      state.isAuthenticated = true;
      state.sessionToken = action.payload.sessionToken;
      state.error = null;
    },
    endSession: (state) => {
      state.isAuthenticated = false;
      state.sessionToken = null;
      state.error = null;
    },
    sessionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { startSession, endSession, sessionError } = sessionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentSession = (state: RootState) => state.session.sessionToken;
export const sessionAuth = (state: RootState) => state.session.isAuthenticated;
export const sessionState = (state: RootState) => state.session.error;

export default sessionSlice.reducer;
