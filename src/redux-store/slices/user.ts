import firebase from "firebase";
import { UserProp } from "utils/interfaces";
import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "redux-store/store";
import * as userApi from "lib/userApi";

export const createUser = createAsyncThunk<
  UserProp,
  { name: string },
  { state: RootState }
>("user/create", async (data, { getState, dispatch }) => {
  return await userApi.createUser({
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

export const phoneLogin = createAsyncThunk<
  firebase.User,
  string,
  { state: RootState }
>("user/phoneLogin", async (code, { getState }) => {
  const { verificationId, phoneNumber } = getState().user.auth.data;
  const data = await userApi.confirmPhoneCode(verificationId, code);
  if (data.user) {
    return data.user;
  } else {
    throw "User not found";
  }
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
  auth: {
    loading: boolean;
    data: {
      phoneNumber: string;
      securityCode: string;
      verificationId: string;
    };
    error: SerializedError | null;
  };
} = {
  loading: {
    creating: false,
    reading: false,
    updating: false,
    deleting: false,
  },
  credentials: null,
  data: null,
  auth: {
    loading: false,
    data: {
      phoneNumber: "",
      securityCode: "",
      verificationId: "",
    },
    error: null,
  },
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
    setPhoneNumber: (state, action) => {
      state.auth.data.phoneNumber = action.payload;
    },
    setSecurityCode: (state, action) => {
      state.auth.data.securityCode = action.payload;
    },
    setVerificationId: (state, action) => {
      state.auth.data.verificationId = action.payload;
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
    builder.addCase(phoneLogin.pending, (state) => {
      state.auth.loading = true;
    });
    builder.addCase(phoneLogin.fulfilled, (state, action) => {
      state.credentials = action.payload;
      state.auth.loading = false;
    });
    builder.addCase(phoneLogin.rejected, (state, action) => {
      state.auth.error = action.error;
      state.auth.loading = false;
    });
  },
});

export const {
  userCredentialsUpdate,
  userDataUpdate,
  setPhoneNumber,
  setSecurityCode,
  setVerificationId,
} = userSlice.actions;

export default userSlice.reducer;
