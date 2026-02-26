import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    auth: false,
    user_type: "",
    token: "",
    userData: null,
    email: "",
    authtype: "",
    user_id: 0,
  },
  reducers: {
    customerLoginSet: (state, action) => {
      state.auth = true;
      if (action.payload.type) {
        state.user_type = action.payload.userType;
      } else if (action.payload.data && action.payload.data.userType) {
        state.user_id = action.payload.data.id
        state.user_type = action.payload.data.userType;
      } else {
        state.user_type = "";
      }
      state.token = action.payload.token || "";
      state.userData = action.payload.data;
    },
    logoutSet: (state) => {
      state.auth = false;
      state.user_type = "";
      state.token = "";
      state.authtype = "";
      state.user_id = 0;
      state.wallet_id = null,
        state.userData = null;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },

  },
});

export const { customerLoginSet, logoutSet, setEmail } =
  authSlice.actions;
export default authSlice.reducer;
