import firebase from "firebase";
import { ListProp } from "utils/interfaces";

export const createList = async (data: ListProp) => {
  let object = {
    ...data,
  };

  const ref = await firebase.firestore().collection("lists").add(object);
  object = { ...object, id: ref.id };
  await ref.update({
    id: ref.id,
  });
  return object as ListProp;
};

export const readLists = async (groupId: string) => {
  const query = await firebase
    .firestore()
    .collection("lists")
    .where("group", "==", groupId)
    .get();

  const data = query.docs.map((doc) => doc.data());
  return data as ListProp[];
};

export const updateList = async (id: string, data: Partial<ListProp>) => {
  await firebase
    .firestore()
    .collection("lists")
    .doc(id)
    .update({ ...data });

  return data;
};

export const deleteList = async (id: string) => {
  await firebase.firestore().collection("lists").doc(id).delete();
  return true;
};
