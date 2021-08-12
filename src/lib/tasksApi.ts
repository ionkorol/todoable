import firebase from "firebase";
import { TaskProp } from "utils/interfaces";

export const createTask = async (data: TaskProp) => {
  const ref = await firebase.firestore().collection("tasks").add(data);

  await ref.update({
    id: ref.id,
  });

  return { ...data, id: ref.id };
};

export const deleteTask = async (id: string) => {
  await firebase.firestore().collection("tasks").doc(id).delete();
  return true;
};

export const readTasks = async (listId: string) => {
  const query = await firebase
    .firestore()
    .collection("tasks")
    .where("list", "==", listId)
    .get();

  const data = query.docs.map((snap) => snap.data());
  return data as TaskProp[];
};

export const updateTask = async (id: string, data: Partial<TaskProp>) => {
  await firebase
    .firestore()
    .collection("tasks")
    .doc(id)
    .update({
      ...data,
    });
  return data;
};
