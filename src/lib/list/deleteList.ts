import firebase from "firebase";
import store from "redux-store/store";

const deleteList = async (listId: string) => {
  const state = store.getState();
  await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup)
    .collection("lists")
    .doc(listId)
    .delete();
  return true;
};

export default deleteList;
