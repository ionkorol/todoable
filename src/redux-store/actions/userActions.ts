import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
} from "redux-store/actions/types";
import { AppDispatch } from "redux-store/store";
import firebase from "utils/firebase";

export const userSignup =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: USER_GET_REQUEST, payload: null });
    try {
      const userCred = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await firebase
        .firestore()
        .collection("users")
        .doc(userCred.user?.uid)
        .set({
          id: userCred.user?.uid,
          createdAt: Date.now(),
          name,
          email,
          groups: [],
          selectedGroup: null,
        });

      dispatch({ type: USER_GET_SUCCESS, payload: { name, email } });
    } catch (error) {
      dispatch({ type: USER_GET_FAILURE, payload: null });
    }
  };
