import firebase from "firebase";
import { UserProp } from "utils/interfaces";
import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "redux-store/store";
import * as UserApi from "lib/userApi";

export const createUser = createAsyncThunk<
  UserProp,
  { name: string },
  { state: RootState }
>("user/create", async (data, { getState, dispatch }) => {
  return await UserApi.createUser({
    id: getState().user.credentials?.uid!,
    createdAt: Date.now(),
    name: data.name,
    email: getState().user.credentials?.email,
    phoneNumber: getState().user.credentials?.phoneNumber,
  });
});

export const readUser = createAsyncThunk<
  UserProp,
  string,
  { state: RootState }
>("user/read", async (id) => {
  // Create User
  const snap = await firebase.firestore().collection("users").doc(id).get();

  const data = snap.data();

  return data as UserProp;
});

const initialState: {
  loading: {
    creating: boolean;
    reading: boolean;
    updating: boolean;
    deleting: boolean;
  };
  credentials: firebase.User | null;
  data: UserProp | null;
  error: SerializedError | null;
} = {
  loading: {
    creating: false,
    reading: false,
    updating: false,
    deleting: false,
  },
  credentials: null,
  data: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDataUpdate: (state, action) => {
      state.data = action.payload;
    },
    userCredentialsUpdate: (state, action) => {
      state.credentials = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading.creating = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading.creating = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.error;
      state.loading.creating = false;
    });
    builder.addCase(readUser.pending, (state) => {
      state.loading.reading = true;
    });
    builder.addCase(readUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading.reading = false;
    });
    builder.addCase(readUser.rejected, (state, action) => {
      state.error = action.error;
      state.loading.reading = false;
    });
  },
});

export const { userCredentialsUpdate, userDataUpdate } = userSlice.actions;

export default userSlice.reducer;
