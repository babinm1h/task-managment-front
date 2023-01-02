export type Locales = "en" | "ru";

export const LOCALES = {
  ENGLISH: "en" as Locales,
  RUSSIAN: "ru" as Locales,
};

export const localesArray: { name: string; value: Locales }[] = [
  { name: "Русский", value: LOCALES.RUSSIAN },
  { name: "English", value: LOCALES.ENGLISH },
];
