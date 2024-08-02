import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: localStorage.getItem("accessToken") ? true : false,
    email: localStorage.getItem("email") || "", 
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },
  }
});

export const { setIsLoggedIn, setUserEmail } = userSlice.actions;
export default userSlice.reducer;
