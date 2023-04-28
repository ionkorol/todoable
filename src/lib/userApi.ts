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

export const sendPhoneCode = async (number: string, recaptcha: any) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    number,
    recaptcha
  );
  return verificationId;
};

export const confirmPhoneCode = async (
  verificationId: string,
  code: string
) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    code
  );
  return await firebase.auth().signInWithCredential(credential);
};

export const logOut = async () => {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const emailAuth = async (email: string, password: string) => {
  let creds = null;
  creds = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (creds.user) {
    return creds;
  }
  creds = await firebase.auth().createUserWithEmailAndPassword(email, password);
  return creds;
};

export const errorHandler = (code: string) => {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "The username and/or password are invalid!";

    case "auth/too-many-requests":
      return "Account has been temporarily disabled due to too many failed login attempts!";
    default:
      return "Error";
  }
};
