import { toast } from "react-toastify";

export const notifySuccess = (message: string) => {
  return toast.success(message.toString());
};

export const notifyError = (errorMsg: string | string[]) => {
  return toast.error(errorMsg.toString());
};
