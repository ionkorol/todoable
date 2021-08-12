import { NativeBaseProvider } from "native-base";
import { MainNavigation } from "navigation";
import React from "react";
import store from "redux-store/store";
import { Provider } from "react-redux";
import theme from "style/theme";
import "utils/firebase";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MainNavigation />
      </NativeBaseProvider>
    </Provider>
  );
}
