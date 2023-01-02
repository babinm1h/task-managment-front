import React, { FC } from "react";
import { GlobeIcon } from "../../../../../../assets/icons";
import { storageSetItem } from "../../../../../../helpers/storageHelpers";
import { useAppDispatch } from "../../../../../../hooks/redux";
import { Locales, localesArray } from "../../../../../../locales/locales";
import { setLocale } from "../../../../../../redux/slices/authSlice";
import ListItem from "../../../../UI/ListItem/ListItem";
import PopMenu from "../../../../UI/PopMenu/PopMenu";

interface IProps {
  isVisible: boolean;
  onToggleVisible: () => void;
  currentLocale: Locales;
}

const LanguagesMenu: FC<IProps> = ({ isVisible, onToggleVisible, currentLocale }) => {
  const dispatch = useAppDispatch();

  const handleChooseLang = (e: React.MouseEvent<HTMLDivElement>) => {
    const lang = e.currentTarget.dataset.value;
    if (lang) {
      storageSetItem("locale", lang);
      dispatch(setLocale(lang as Locales));
    }
  };

  return (
    <PopMenu
      isOpen={isVisible}
      onClick={onToggleVisible}
      placement={"bottom"}
      triggerElem={
        <>
          <GlobeIcon size={20} />
          {currentLocale.toUpperCase()}
        </>
      }
      offset={[0, 12]}
    >
      {localesArray.map((loc) => (
        <ListItem
          key={loc.value}
          data-value={loc.value}
          onClick={handleChooseLang}
          active={currentLocale === loc.value}
        >
          {loc.name}
        </ListItem>
      ))}
    </PopMenu>
  );
};

export default LanguagesMenu;
