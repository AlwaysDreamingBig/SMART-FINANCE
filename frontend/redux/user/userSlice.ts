import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface UserState {
  currentUser: {
    id: string;
    email: string;
    name: string;
    __t?: string;
    session?: string;
  } | null; // Adjust fields as needed
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
};

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        name: string;
        __t?: string;
        session?: string;
      }>
    ) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const connectedtUser = (state: RootState) => state.user.currentUser;
export const signLoading = (state: RootState) => state.user.loading;
export const signError = (state: RootState) => state.user.error;

export default userSlice.reducer;
