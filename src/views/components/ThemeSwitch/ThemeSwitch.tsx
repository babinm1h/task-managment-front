import React from "react";
import { MoonIcon } from "../../../assets/icons";
import { AppThemes } from "../../../context/ThemeContext";
import { useTheme } from "../../../hooks/useTheme";
import Toggle from "../UI/Toggle/Toggle";
import st from "./ThemeSwitch.module.scss";

const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === AppThemes.light) {
      setTheme(AppThemes.dark);
    } else {
      setTheme(AppThemes.light);
    }
  };

  return (
    <div className={st.theme}>
      <Toggle onChange={toggleTheme} checked={theme === AppThemes.dark} />
      <MoonIcon size={18} />
    </div>
  );
};

export default ThemeSwitch;
