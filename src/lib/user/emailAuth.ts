import firebase from "firebase";

export default async (email: string, password: string) => {
  let creds = null;
  creds = await firebase.auth().signInWithEmailAndPassword(email, password);
  if (creds.user) {
    return creds;
  }
  creds = await firebase.auth().createUserWithEmailAndPassword(email, password);
  return creds;
};
