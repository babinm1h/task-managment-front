import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import updateLocale from "dayjs/plugin/updateLocale";
import weekday from "dayjs/plugin/weekday";
import * as ru from "dayjs/locale/ru";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);

dayjs.updateLocale("ru", {
  relativeTime: {
    ...ru.relativeTime,
  },
  weekStart: 1,
});

export class DateHelpers {
  static getDateObj(initialDate?: string | Date) {
    return initialDate ? dayjs(initialDate) : dayjs();
  }

  static getMonthDays = (month = dayjs().month()) => {
    month = Math.floor(month);

    const year = dayjs().year();
    const firstDayOfMonth = dayjs(new Date(year, month, 0)).day();

    let currMonth = 0 - firstDayOfMonth;

    const daysMatrix = new Array(5).fill("").map(() =>
      new Array(7).fill("").map(() => {
        currMonth++;
        return dayjs(new Date(year, month, currMonth));
      })
    );

    return daysMatrix;
  };

  static formatDate = (date: string | Date, template: string) => {
    return dayjs(date).format(template);
  };

  static checkIsAfter = (date: string | Date) => {
    return dayjs().isAfter(date);
  };

  static format(format: string, date?: Date | string) {
    return date ? dayjs(date).format(format) : dayjs().format(format);
  }

  static getMonthName(month: number, withYear?: boolean) {
    return withYear
      ? dayjs(new Date(dayjs().year(), month)).format("MMMM YYYY")
      : dayjs(new Date(dayjs().year(), month)).format("MMMM");
  }

  static getHoursArr() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(dayjs().hour(i).format("HH:00"));
    }

    return hours;
  }

  static getWeekDays(currentDay: Date) {
    const startOfWeek = dayjs(currentDay).locale("ru").startOf("week");
    const endOfWeek = dayjs(currentDay).locale("ru").endOf("week");
    let week = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      week.push(day);
      day = day.clone().add(1, "d");
    }

    return week;
  }

  static getWeekDay(currentDay: Date) {
    return weekDays[dayjs(currentDay).locale("ru").weekday()];
  }

  static hoursToSeconds(hours: string) {
    const spl = hours.split(":");
    return +spl[0] * 60 * 60 + +spl[1] * 60;
  }
}

export const weekDays = [
  "days.monday",
  "days.tuesday",
  "days.wednesday",
  "days.thursday",
  "days.friday",
  "days.saturday",
  "days.sunday",
];
// currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1);

// for (let i = 0; i < 7; i++) {
//   week.push(new Date(currentDay));
//   currentDay.setDate(currentDay.getDate() + 1);
// }
// return week.map((d) => dayjs(d));
