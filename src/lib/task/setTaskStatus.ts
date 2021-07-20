import firebase from "firebase";
import store from "redux-store/store";

const setTaskStatus = async (taskId: string, status: "active" | "complete") => {
  try {
    const state = store.getState();
    await firebase
      .firestore()
      .collection("groups")
      .doc(state.user.data?.selectedGroup)
      .collection("lists")
      .doc(state.selected.list!)
      .collection("tasks")
      .doc(taskId)
      .update({
        status,
      });
    return true;
  } catch (error) {
    return false;
  }
};

export default setTaskStatus;
