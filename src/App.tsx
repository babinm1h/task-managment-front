import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { useDispatch } from "react-redux";
import { Locales, LOCALES } from "./locales/locales";
import { useLazyCheckAuthQuery } from "./redux/services/auth/authApi";
import { setAuthData, setLocale } from "./redux/slices/authSlice";
import AppRoutes from "./views/components/AppRoutes/AppRoutes";
import Loader from "./views/components/UI/Loader/Loader";
import ru from "./locales/messages/messages.ru.json";
import en from "./locales/messages/messages.en.json";
import { useAppSelector } from "./hooks/redux";
import { storageGetItem, storageSetItem } from "./helpers/storageHelpers";
import { ToastContainer } from "react-toastify";
import { notifyError } from "./helpers/toastHelpers";
import "react-toastify/dist/ReactToastify.css";

const locales = {
  en,
  ru,
};

const App = () => {
  const dispatch = useDispatch();
  const [checkAuth] = useLazyCheckAuthQuery();
  const [isLoading, setIsLoading] = useState(true);
  const locale = useAppSelector((state) => state.auth.locale);

  const initialCheckAuth = async () => {
    try {
      const user = await checkAuth().unwrap();
      dispatch(setAuthData(user));
    } catch (err: any) {
      notifyError(err.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const initalGetLocale = () => {
    const storageLocale = storageGetItem<Locales>("locale");
    if (storageLocale && Object.values(LOCALES).includes(storageLocale)) {
      dispatch(setLocale(storageLocale));
    } else {
      storageSetItem("locale", LOCALES.ENGLISH);
    }
  };

  useEffect(() => {
    initialCheckAuth();
    initalGetLocale();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <IntlProvider
      locale={LOCALES.ENGLISH}
      messages={locales[locale]}
      defaultLocale={LOCALES.ENGLISH}
      onError={(e) => console.log(e.message)}
    >
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </IntlProvider>
  );
};

export default App;
