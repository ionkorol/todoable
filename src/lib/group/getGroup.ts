import firebase from "firebase";
import { GroupProp } from "utils/interfaces";

const getGroup = async (groupId: string) => {
  try {
    const snap = await firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .get();
    const data = snap.data();
    return data as GroupProp;
  } catch (error) {
    return false;
  }
};

export default getGroup;
