import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  Udata: [];
}

const intialState: UserData = {
  Udata: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    setUser: (state, action) => {
      state.Udata = action.payload;
      console.log(state.Udata);
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice;
