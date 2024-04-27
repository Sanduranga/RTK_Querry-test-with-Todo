import { createSlice } from "@reduxjs/toolkit";
import { loggedUser } from "../models/models";

const initialState: loggedUser = {
  email: "",
  email_verified: false,
  name: "Hi",
  sub: "",
};

export const userSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
