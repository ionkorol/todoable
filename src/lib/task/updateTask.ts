import firebase from "firebase";
import store from "redux-store/store";
import { TaskProp } from "utils/interfaces";

const updateTask = async (taskId: string, values: TaskProp) => {
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
        ...values,
      });
    return true;
  } catch (error) {
    return false;
  }
};

export default updateTask;
