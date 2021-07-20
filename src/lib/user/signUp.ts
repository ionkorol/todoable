import firebase from "firebase";

export default async (name: string, email: string, password: string) => {
  const userCred = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  await firebase.firestore().collection("users").doc(userCred.user?.uid).set({
    id: userCred.user?.uid,
    createdAt: Date.now(),
    name,
    email,
    groups: [],
    selectedGroup: null,
  });
};
