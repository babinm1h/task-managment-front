import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { CalendarIcon, TasksIcon } from "../../../../../assets/icons";
import { useAppSelector } from "../../../../../hooks/redux";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { translate } from "../../../../../locales/translate";
import { APP_ROUTES } from "../../../AppRoutes/AppRoutes";
import ThemeSwitch from "../../../ThemeSwitch/ThemeSwitch";
import st from "./Header.module.scss";
import LanguagesMenu from "./LanguagesMenu/LanguagesMenu";
import UserMenu from "./UserMenu/UserMenu";

const Header = () => {
  const { locale, user } = useAppSelector((state) => state.auth);
  const languageMenuState = useOutsideClick(false);

  return (
    <header className={st.header}>
      <div className={st.first}>
        <div className={st.theme}>
          <ThemeSwitch />
        </div>
        <nav className={st.nav}>
          <NavLink className={st.navItem} to={APP_ROUTES.main}>
            <TasksIcon /> {translate({ id: "header.boards" })}
          </NavLink>
          <NavLink className={classNames(st.navItem, st.navCalendar)} to={APP_ROUTES.calendar}>
            <CalendarIcon /> {translate({ id: "header.calendar" })}
          </NavLink>
        </nav>
      </div>

      <div className={st.second}>
        <button className={st.lang} ref={languageMenuState.ref}>
          <LanguagesMenu
            currentLocale={locale}
            onToggleVisible={languageMenuState.onToggleVisible}
            isVisible={languageMenuState.isVisible}
          />
        </button>
        <UserMenu user={user} languageMenuState={languageMenuState} locale={locale} />
      </div>
    </header>
  );
};

export default Header;
