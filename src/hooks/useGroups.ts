import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GroupProp } from "utils/interfaces";
import firebase from "firebase";
import { AppDispatch, RootState } from "redux-store/store";

const useGroups = () => {
  const dispatch = useDispatch();

  const create = createAsyncThunk<
    GroupProp[],
    null,
    { dispatch: AppDispatch; state: RootState }
  >("groups/read", async (s, { dispatch, getState }) => {
    const query = await firebase
      .firestore()
      .collection("groups")
      .where("members", "array-contains", getState().user.credentials?.uid)
      .get();

    const data = query.docs.map((snap) => snap.data());
    return data as GroupProp[];
  });

  const read = createAsyncThunk<
    GroupProp[],
    null,
    { dispatch: AppDispatch; state: RootState }
  >("groups/read", async (s, { dispatch, getState }) => {
    const query = await firebase
      .firestore()
      .collection("groups")
      .where("members", "array-contains", getState().user.credentials?.uid)
      .get();

    const data = query.docs.map((snap) => snap.data());
    return data as GroupProp[];
  });
};

export default useGroups;
