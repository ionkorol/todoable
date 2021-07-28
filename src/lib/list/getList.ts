import firebase from "firebase";
import store from "redux-store/store";
import { ListProp } from "utils/interfaces";

const getList = async (listId: string) => {
  const state = store.getState();
  const snap = await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup)
    .collection("lists")
    .doc(listId)
    .get();

  const data = snap.data();
  return data as ListProp;
};

export default getList;
