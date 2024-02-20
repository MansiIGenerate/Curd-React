import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    // addData: (state, action) => {
    //   state.push(action.payload);
    // },

    addUser: (state, action) => {
      state.push(action.payload);
    },

    deleteUser: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    updateUser: (state, action) => {
      const { _id, ...updatedUser } = action.payload;
      const index = state.findIndex((user) => user._id === _id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedUser };
      }
    },
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const { addUser, deleteUser, updateUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
