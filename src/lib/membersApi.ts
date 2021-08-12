import firebase from "firebase";
import { GroupProp, MembersProp } from "utils/interfaces";
import { readUser } from "./userApi";

export const readMembers = async (group: GroupProp) => {
  let data: MembersProp[] = [];
  const query = await firebase
    .firestore()
    .collection("groups")
    .doc(group.id)
    .collection("members")
    .get();

  for (const member of query.docs) {
    const memberData = member.data();
    const userData = await readUser(memberData.id);
    data = [
      ...data,
      { id: userData.id, data: userData, role: memberData.role },
    ];
  }
  return data;
};

export const createMember = async (groupId: string, data: MembersProp) => {
  await firebase
    .firestore()
    .collection("groups")
    .doc(groupId)
    .collection("members")
    .doc(data.id)
    .set(data);
  return true;
};
