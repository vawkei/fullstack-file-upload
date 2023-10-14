import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialTokenState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  user: localStorage.getItem("user") ? localStorage.getItem("user") : "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {
    SETACTIVETOKEN(state, action) {
      const data = action.payload;
      //console.log(data);
      const user = data.user.name;
      const token = data.token;
      console.log(user,token)
      state.token = token;
      state.user = user;

      localStorage.setItem("token", state.token);
      localStorage.setItem("user", state.user);
    },
    CLEARACTIVETOKEN(state){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        state.token="";
        state.user=""
    }
  },
});
const store = configureStore({
  reducer: { token: tokenSlice.reducer },
});
export const tokenActions = tokenSlice.actions;
export default store;
