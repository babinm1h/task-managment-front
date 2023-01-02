import { IUser } from "../../../types/entities.types";
import apiSlice from "../apiSlice";

interface IRegisterArgs {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: IUser;
  token: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registrate: builder.mutation<IAuthResponse, IRegisterArgs>({
      query: (args) => ({
        url: "/auth/register",
        method: "POST",
        body: args,
      }),
    }),

    login: builder.mutation<IAuthResponse, IRegisterArgs>({
      query: (args) => ({
        url: "/auth/login",
        method: "POST",
        body: args,
      }),
    }),

    checkAuth: builder.query<IUser, void>({
      query: () => ({
        url: "/auth/check",
      }),
    }),
  }),
});

export const { useRegistrateMutation, useLoginMutation, useLazyCheckAuthQuery } = authApi;
