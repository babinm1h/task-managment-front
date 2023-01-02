import { DateHelpers } from "./dateHelpers";

export const hoursNow = DateHelpers.getDateObj().format("HH:mm");
export const hourNow = hoursNow.split(":")[0];
export const minutesNow = hoursNow.split(":")[1];

export const shouldShowHours = (hours: string) => {
  const hoursHour = hours.split(":")[0];
  if (hoursHour === hourNow && +minutesNow < 20) {
    return false;
  }
  if (+hoursHour === +hourNow + 1 && +minutesNow > 55) {
    return false;
  }
  return true;
};
