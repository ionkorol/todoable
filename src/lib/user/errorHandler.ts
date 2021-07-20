export default (code: string) => {
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
