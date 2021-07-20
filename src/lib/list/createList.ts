import firebase from "firebase";
import React from "react";
import store from "redux-store/store";
import { ListProp } from "utils/interfaces";

const createList = async (data: ListProp) => {
  try {
    const state = store.getState();
    const ref = await firebase
      .firestore()
      .collection("groups")
      .doc(state.user.data?.selectedGroup)
      .collection("lists")
      .add({
        ...data,
        createdAt: Date.now(),
      });
    await ref.update({
      id: ref.id,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default createList;
