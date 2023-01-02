import cookies from "js-cookie";

export const getTokenCookie = () => {
  return cookies.get("boardToken");
};

export const setTokenCookie = (token: string) => {
  cookies.set("boardToken", token);
};

export const deleteTokenCookie = () => {
  cookies.remove("boardToken");
};
