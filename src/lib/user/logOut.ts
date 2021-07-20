import firebase from "firebase";

const logOut = async () => {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default logOut;
