import firebase from "firebase";
import store from "redux-store/store";

const setGroup = async (groupId: string) => {
  try {
    const state = store.getState();
    await firebase
      .firestore()
      .collection("users")
      .doc(state.user.data?.id)
      .update({
        selectedGroup: groupId,
      });
    return true;
  } catch (error) {
    return false;
  }
};

export default setGroup;
