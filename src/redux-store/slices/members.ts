import { MembersProp } from "utils/interfaces";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import * as MembersApi from "lib/membersApi";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux-store/store";

export const readMembers = createAsyncThunk<
  MembersProp[],
  null,
  { state: RootState }
>("members/read", async (_, { getState }) => {
  return await MembersApi.readMembers(
    getState().groups.groups.find(
      (item) => item.id === getState().groups.group
    )!
  );
});

const initialState: {
  loading: {
    creating: boolean;
    reading: boolean;
    updating: boolean;
    deleting: boolean;
  };
  members: MembersProp[];
  pastmembers: MembersProp[];
  error: SerializedError | null;
} = {
  loading: {
    creating: false,
    reading: false,
    updating: false,
    deleting: false,
  },
  members: [],
  pastmembers: [],
  error: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readMembers.pending, (state) => {
      state.loading.reading = true;
    });
    builder.addCase(readMembers.fulfilled, (state, action) => {
      state.loading.reading = false;
      state.pastmembers = state.members;
      state.members = action.payload;
    });
    builder.addCase(readMembers.rejected, (state, action) => {
      state.error = action.error;
      state.loading.reading = false;
    });
  },
});

export default groupsSlice.reducer;
// export const { setList, undo } = groupsSlice.actions;
