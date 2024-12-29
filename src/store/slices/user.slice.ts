import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
  isLoggedIn: boolean;
  purchasedChapters: string[];
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isLoggedIn: false,
  token: null,
  purchasedChapters: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.purchasedChapters = action.payload.purchasedChapters;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
      state.purchasedChapters = [];
    },
    addPurchasedChapter: (state, action: PayloadAction<any>) => {
      if (!state.purchasedChapters.includes(action.payload)) {
        state.purchasedChapters.push(action.payload);
      }
    },
  },
});

export const { setUser, clearUser, addPurchasedChapter } = userSlice.actions;
export default userSlice.reducer;
