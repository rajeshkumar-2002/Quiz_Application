import { createSlice } from "@reduxjs/toolkit";
import { setlocalstorage, removelocalstorage } from "../../localstorage";
import { getlocalstorage } from "../../localstorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: getlocalstorage("user"),
    user_email: null,
    token: null,
    user_id: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user_email = action.payload.user_email;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      setlocalstorage("user", {
        user_email: action.payload.user_email,
        token: action.payload.token,
        isLoggedIn: true,
        user_id: action.payload.user_id,
      });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.token = null;
      removelocalstorage("user");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
