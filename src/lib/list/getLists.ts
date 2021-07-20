import firebase from "firebase";
import store from "redux-store/store";
import { ListProp } from "utils/interfaces";

const getLists = async () => {
  try {
    const state = store.getState();
    const query = await firebase
      .firestore()
      .collection("groups")
      .doc(state.user.data?.selectedGroup)
      .collection("lists")
      .get();

    let data: any[] = [];
    for (const docSnap of query.docs) {
      const docData = docSnap.data();
      const tasksQuery = await docSnap.ref.collection("tasks").get();
      const tasksData = tasksQuery.docs.map((snap) => snap.data());
      data = [...data, { ...docData, tasks: tasksData }];
    }

    return data as ListProp[];
  } catch (error) {
    return false;
  }
};

export default getLists;
