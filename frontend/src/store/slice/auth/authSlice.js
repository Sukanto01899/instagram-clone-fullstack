import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.userInfo = {};
      state.error = null;
      state.success = false;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  },
});

export const { clearState, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
