import firebase from "firebase";
import store from "redux-store/store";

const joinGroup = async (groupId: string) => {
  try {
    const state = store.getState();

    // Update User
    await firebase
      .firestore()
      .collection("users")
      .doc(state.user.data?.id)
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(groupId),
        selectedGroup: groupId,
      });

    // Update Group
    await firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(state.user.data?.id),
      });

    return true;
  } catch (error) {
    return false;
  }
};

export default joinGroup;
