import firebase from "firebase";
import store from "redux-store/store";
import { TaskProp } from "utils/interfaces";

const createTask = async (data: TaskProp) => {
  try {
    const state = store.getState();

    // Create Task Document
    const object: TaskProp = {
      ...data,
      createdAt: Date.now(),
      status: "active",
      archived: false,
    };
    const ref = await firebase
      .firestore()
      .collection("groups")
      .doc(state.user.data?.selectedGroup)
      .collection("lists")
      .doc(state.selected.list!)
      .collection("tasks")
      .add(object);

    await ref.update({
      id: ref.id,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default createTask;
