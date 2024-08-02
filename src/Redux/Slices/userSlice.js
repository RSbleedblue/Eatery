import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: sessionStorage.getItem("accessToken") ? true : false,
    email: sessionStorage.getItem("email") || "", 
    orderCart : [] || sessionStorage.getItem("ordercart"),
    restaurantName : "",
    restaurantID : "",
    userID : "",
  },
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },
    setRestaurantName (state,action){
      state.restaurantName = action.payload;
    },
    setRestaurantID ( state,action ){
      state.restaurantID = action.payload;
      console.log(state.restaurantID);
    },
    setUserID(state,action){
      state.userID = action.payload;
    }
  }
});

export const { setIsLoggedIn, setUserEmail, setRestaurantName, setRestaurantID, setUserID } = userSlice.actions;
export default userSlice.reducer;
