import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenIsThere, setTokenIsNotThere } from "@/config/redux/reducer/authReducer";

function AppInitializer({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in localStorage on app initialization
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setTokenIsThere());
    } else {
      dispatch(setTokenIsNotThere());
    }
  }, [dispatch]);

  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppInitializer Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
