import firebase from "firebase";

const logIn = async (email: string, password: string) => {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return user;
};

export default logIn;
