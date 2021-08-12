import firebase from "firebase";
import { UserProp } from "utils/interfaces";

export const createUser = async (data: UserProp) => {
  // User object
  const object: UserProp = {
    ...data,
    createdAt: Date.now(),
  };

  // Create User
  await firebase
    .firestore()
    .collection("users")
    .doc(data.id)
    .set({ ...object });

  return object;
};

export const readUser = async (id: string) => {
  // Create User
  const snap = await firebase.firestore().collection("users").doc(id).get();

  const data = snap.data();

  return data as UserProp;
};
