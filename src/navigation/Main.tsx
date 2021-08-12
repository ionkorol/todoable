import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { useEffect } from "react";
import {
  readUser,
  userCredentialsUpdate,
  userDataUpdate,
} from "redux-store/slices/user";
import { RootState } from "redux-store/store";
import AuthNavigation from "./Auth";
import HomeNavigation from "./Home";

interface Props {}

const Main: React.FC<Props> = (props) => {
  const { data, credentials } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(userCredentialsUpdate(user));
        dispatch(readUser(user.uid));
      } else {
        dispatch(userCredentialsUpdate(null));
        dispatch(userDataUpdate(null));
      }
    });

    return () => unsub();
  }, []);

  return (
    <NavigationContainer>
      {data ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Main;
