import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../../../../hooks/redux";
import { useOutsideClick } from "../../../../../../hooks/useOutsideClick";
import { Locales } from "../../../../../../locales/locales";
import { translate } from "../../../../../../locales/translate";
import { logout } from "../../../../../../redux/slices/authSlice";
import { IUser } from "../../../../../../types/entities.types";
import { APP_ROUTES } from "../../../../AppRoutes/AppRoutes";
import ThemeSwitch from "../../../../ThemeSwitch/ThemeSwitch";
import Button from "../../../../UI/Button/Button";
import ListItem from "../../../../UI/ListItem/ListItem";
import PopMenu from "../../../../UI/PopMenu/PopMenu";
import LanguagesMenuItem from "../LanguagesMenuItem/LanguagesMenuItem";
import st from "../Header.module.scss";
import { deleteTokenCookie } from "../../../../../../helpers/cookieHelpers";

interface IProps {
  user: IUser | null;
  locale: Locales;
  languageMenuState: {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    ref: React.MutableRefObject<any>;
    onToggleVisible: () => void;
  };
}

const UserMenu: FC<IProps> = ({ user, locale, languageMenuState }) => {
  const { isVisible, onToggleVisible, ref } = useOutsideClick(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    deleteTokenCookie();
    dispatch(logout());
  };

  return (
    <>
      {user ? (
        <div className={st.menuWrapper} ref={ref}>
          <PopMenu
            placement={"bottom-end"}
            triggerElem={<div className={st.userName}>{user.email}</div>}
            onClick={onToggleVisible}
            isOpen={isVisible}
            offset={[0, 7]}
          >
            <ul className={st.menu}>
              <ListItem ref={languageMenuState.ref} className={st.mobileLang}>
                <LanguagesMenuItem
                  currentLocale={locale}
                  onToggleVisible={languageMenuState.onToggleVisible}
                  isVisible={languageMenuState.isVisible}
                />
              </ListItem>
              <NavLink to={APP_ROUTES.calendar} className={st.navCalendar}>
                <ListItem>{translate({ id: "header.calendar" })}</ListItem>
              </NavLink>
              <ListItem onClick={handleLogout}>{translate({ id: "auth.logout" })}</ListItem>
              <ListItem className={st.theme}>
                <ThemeSwitch />
              </ListItem>
            </ul>
          </PopMenu>
        </div>
      ) : (
        <NavLink to={APP_ROUTES.login}>
          <Button>{translate({ id: "auth.login" })}</Button>
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
