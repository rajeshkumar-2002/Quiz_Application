import { configureStore } from '@reduxjs/toolkit';
import userSlice from "../pages/Login/LoginSlice"

export default configureStore({
  reducer: {
    user : userSlice,
  },
})