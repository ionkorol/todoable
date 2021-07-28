import firebase from "firebase";
import store from "redux-store/store";

const deleteTask = async (taskId: string) => {
  const state = store.getState();
  await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup)
    .collection("lists")
    .doc(state.selected.list!)
    .collection("tasks")
    .doc(taskId)
    .delete();
};

export default deleteTask;
