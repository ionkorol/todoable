import firebase from "firebase";
import store from "redux-store/store";
import { TaskProp } from "utils/interfaces";

const getTask = async (taskId: string) => {
  const state = store.getState();
  const snap = await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup!)
    .collection("lists")
    .doc(state.selected.list!)
    .collection("tasks")
    .doc(taskId)
    .get();

  const data = snap.data();
  return data as TaskProp;
};

export default getTask;
