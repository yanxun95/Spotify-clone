import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../setup/store";

interface UserState {
  _id: string;
  name: string;
}

const initialState: UserState = {
  _id: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
