import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

export enum AppThemes {
  light = "light",
  dark = "dark",
}

const getTheme = () => {
  const saved = window?.localStorage?.getItem("theme") as AppThemes;
  if (Object.values(AppThemes).includes(saved)) return saved;

  const userPref = window.matchMedia("(prefers-color-scheme: light)").matches
    ? AppThemes.dark
    : AppThemes.dark;

  return userPref;
};

export const ThemeContext = createContext<{ theme: AppThemes; setTheme: (theme: AppThemes) => void }>({
  setTheme: (theme) => {},
  theme: getTheme(),
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<AppThemes>(getTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
