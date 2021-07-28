import firebase from "firebase";
import store from "redux-store/store";

const deleteProgress = async (taskId: string, progressId: string) => {
  const state = store.getState();
  await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup!)
    .collection("lists")
    .doc(state.selected.list!)
    .collection("tasks")
    .doc(taskId)
    .collection("progress")
    .doc(progressId)
    .delete();
};

export default deleteProgress;
