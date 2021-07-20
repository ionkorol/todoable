import firebase from "firebase";
import store from "redux-store/store";
import { GroupProp, ListProp } from "utils/interfaces";

const createGroup = async (data: GroupProp) => {
  try {
    const state = store.getState();

    // Create Group
    const groupRef = await firebase
      .firestore()
      .collection("groups")
      .add({
        ...data,
        members: [state.user.data?.id],
      });

    await groupRef.update({ id: groupRef.id });

    // Create Default List
    const listRef = await groupRef.collection("lists").add({
      createdAt: Date.now(),
      name: "Default",
    } as ListProp);

    await listRef.update({
      id: listRef.id,
    });

    // Update User
    await firebase
      .firestore()
      .collection("users")
      .doc(state.user.data?.id)
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(groupRef.id),
        selectedGroup: groupRef.id,
      });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default createGroup;
