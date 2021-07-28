import firebase from "firebase";
import store from "redux-store/store";
import { ListProp } from "utils/interfaces";

const updateList = async (listId: string, data: ListProp) => {
  const state = store.getState();
  await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup)
    .collection("lists")
    .doc(listId)
    .update({ ...data });

  return true;
};

export default updateList;
