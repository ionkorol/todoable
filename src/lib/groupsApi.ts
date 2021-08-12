import firebase from "firebase";
import * as ListApi from "lib/listApi";
import members from "redux-store/slices/members";
import { GroupProp } from "utils/interfaces";
import { createMember } from "./membersApi";

export const getUpdates = (userId: string) => {
  return firebase
    .firestore()
    .collection("groups")
    .where("members", "array-contains", userId).onSnapshot;
};

export const joinGroup = async (groupId: string, userId: string) => {
  await firebase
    .firestore()
    .collection("groups")
    .doc(groupId)
    .update({
      members: firebase.firestore.FieldValue.arrayUnion(userId),
    });

  await firebase
    .firestore()
    .collection("groups")
    .doc(groupId)
    .collection("members")
    .doc(userId)
    .set({
      id: userId,
      role: "member",
    });

  return true;
};

export const createGroup = async (data: GroupProp) => {
  // Create Group
  const groupRef = await firebase
    .firestore()
    .collection("groups")
    .add({
      ...data,
    });
  await groupRef.update({ id: groupRef.id });

  for (const member of data.members) {
    createMember(groupRef.id, { id: member, role: "admin" });
  }

  // Create Default List
  ListApi.createList({
    id: "",
    createdAt: Date.now(),
    name: "Reminders",
    group: groupRef.id,
    icon: "list",
    color: "rose",
    author: data.members[0],
  });

  return { ...data, id: groupRef.id };
};

export const deleteGroup = async (id: string) => {
  await firebase.firestore().collection("groups").doc(id).delete();
  return true;
};

export const readGroups = async (userId: string) => {
  const query = await firebase
    .firestore()
    .collection("groups")
    .where("members", "array-contains", userId)
    .get();

  const data = query.docs.map((snap) => snap.data());
  return data as GroupProp[];
};

export const updateGroup = async (id: string, data: Partial<GroupProp>) => {
  await firebase
    .firestore()
    .collection("groups")
    .doc(id)
    .update({
      ...data,
    });
  return data;
};
