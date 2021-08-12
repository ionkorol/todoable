import firebase from "firebase";

const sendPhoneVerification = async (number: string, recaptcha: any) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  const verificationId = await phoneProvider.verifyPhoneNumber(
    number,
    recaptcha
  );
  return verificationId;
};

const confirmPhoneCode = async (verificationId: string, code: string) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    code
  );
  return await firebase.auth().signInWithCredential(credential);
};

const phoneAuth = {
  sendPhoneVerification,
  login: confirmPhoneCode,
};

export default phoneAuth;
