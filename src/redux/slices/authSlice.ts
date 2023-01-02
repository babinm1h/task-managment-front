import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locales, LOCALES } from "../../locales/locales";
import { IUser } from "../../types/entities.types";

interface IState {
  user: IUser | null;
  locale: Locales;
}

const initialState: IState = {
  user: null,
  locale: LOCALES.ENGLISH as Locales,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLocale: (state, action: PayloadAction<Locales>) => {
      state.locale = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { logout, setAuthData, setLocale } = authSlice.actions;
