import firebase from "firebase";
import store from "redux-store/store";
import { TaskProp } from "utils/interfaces";

const getTasks = async () => {
  const state = store.getState();
  try {
    const query = await firebase
      .firestore()
      .collection("groups")
      .doc(state.user.data?.selectedGroup!)
      .collection("lists")
      .doc(state.selected.list!)
      .collection("tasks")
      .get();

    const data = query.docs.map((snap) => snap.data());
    return data as TaskProp[];
  } catch (error) {
    console.log(error)
    return [];
  }
};

export default getTasks;
