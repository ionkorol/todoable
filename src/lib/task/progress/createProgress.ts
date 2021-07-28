import firebase from "firebase";
import store from "redux-store/store";
import { TaskProgressProp } from "utils/interfaces";

const createTaskProgress = async (taskId: string, data: TaskProgressProp) => {
  const state = store.getState();
  const object = {
    ...data,
    createdAt: Date.now(),
    user: state.user.data?.id,
  };
  const ref = await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup!)
    .collection("lists")
    .doc(state.selected.list!)
    .collection("tasks")
    .doc(taskId)
    .collection("progress")
    .add(object);
    
  await ref.update({ id: ref.id });
};

export default createTaskProgress;
