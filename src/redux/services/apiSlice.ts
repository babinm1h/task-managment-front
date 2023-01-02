import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { deleteTokenCookie, getTokenCookie, setTokenCookie } from "../../helpers/cookieHelpers";
import { logout, setAuthData } from "../slices/authSlice";
// !!!
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const token = getTokenCookie();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const token = getTokenCookie();
  const isExpired = false;
  let result = await baseQuery(args, api, extraOptions);

  if (token && result?.error?.status === 401) {
    // send refresh to get new access
    const refreshResult: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery(
      "/refresh",
      api,
      extraOptions
    );
    console.log(refreshResult);

    if (refreshResult.data) {
      const { user } = (api.getState() as any).auth;
      setTokenCookie(refreshResult.data.token);
      api.dispatch(setAuthData(user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      deleteTokenCookie();
      api.dispatch(logout());
    }
  }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});

export default apiSlice;
