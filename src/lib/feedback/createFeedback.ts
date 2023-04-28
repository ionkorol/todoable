import firebase from "firebase";

const createFeedback = async (data: any) => {
  const ref = await firebase.firestore().collection("feedback").add(data);
  await ref.update({
    id: ref.id,
    createdAt: Date.now(),
  });
};
export default createFeedback;
