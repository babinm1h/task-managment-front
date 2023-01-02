import { configureStore, combineReducers, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import apiSlice from "./services/apiSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
