import firebase from "firebase";
import { UserProp } from "utils/interfaces";

const getUser = async (userId: string) => {
  const snap = await firebase.firestore().collection("users").doc(userId).get();
  const data = snap.data();
  return data as UserProp;
};

export default getUser;
