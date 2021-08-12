import firebase from "firebase";

import { TaskProgressProp } from "utils/interfaces";

export const createProgress = async (
  taskId: string,
  data: TaskProgressProp
) => {
  let object = {
    ...data,
    createdAt: Date.now(),
  };

  const ref = await firebase
    .firestore()
    .collection("tasks")
    .doc(taskId)
    .collection("progress")
    .add(object);

  object = { ...object, id: ref.id };
  await ref.update({ id: ref.id });
  return ref.id;
};

export const deleteProgress = async (taskId: string, progressId: string) => {
  await firebase
    .firestore()
    .collection("tasks")
    .doc(taskId)
    .collection("progress")
    .doc(progressId)
    .delete();
  return true;
};

export const readProgress = async (taskId: string) => {
  const query = await firebase
    .firestore()
    .collection("tasks")
    .doc(taskId)
    .collection("progress")
    .get();

  const data = query.docs.map((doc) => doc.data());
  return data as TaskProgressProp[];
};
