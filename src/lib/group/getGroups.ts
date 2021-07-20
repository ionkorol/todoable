import firebase from "firebase";
import store from "redux-store/store";
import { GroupProp } from "utils/interfaces";

const getGroups = async () => {
  try {
    const state = store.getState();
    const query = await firebase
      .firestore()
      .collection("groups")
      .where("members", "array-contains", state.user.data?.id)
      .get();
    const data = query.docs.map((snap) => snap.data());
    return data as GroupProp[];
  } catch (error) {
    return false;
  }
};

export default getGroups;
