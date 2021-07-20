import { NativeBaseProvider } from "native-base";
import { MainNavigation } from "navigation";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_CLEAR,
} from "redux-store/actions/types";
import store from "redux-store/store";
import { Provider } from "react-redux";
import theme from "style/theme";
import firebase from "firebase";
import "utils/firebase";

export default function App() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const { dispatch } = store;
    if (user) {
      const { uid } = user;
      const unsub = firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .onSnapshot(async (dataSnap) => {
          const data = dataSnap.data();
          dispatch({ type: USER_GET_REQUEST, payload: null });
          try {
            dispatch({
              type: USER_GET_SUCCESS,
              payload: data,
            });
          } catch (error) {
            dispatch({ type: USER_GET_FAILURE, payload: error });
          }
        });
      return () => unsub();
    } else {
      dispatch({ type: USER_CLEAR, payload: null });
    }
  }, [user]);

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MainNavigation />
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
