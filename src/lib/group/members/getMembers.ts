import firebase from "firebase";
import { getUser } from "lib/user";
import store from "redux-store/store";
import { UserProp } from "utils/interfaces";

const getMembers = async () => {
  let members: any[] = [];
  const state = store.getState();
  const snap = await firebase
    .firestore()
    .collection("groups")
    .doc(state.user.data?.selectedGroup)
    .get();
  const data = snap.data();
  for (const userId of data?.members) {
    const userData = await getUser(userId);
    members = [...members, { ...userData }];
  }
  return members as UserProp[];
};

export default getMembers;
