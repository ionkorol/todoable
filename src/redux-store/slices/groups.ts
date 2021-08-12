import { GroupProp } from "utils/interfaces";
import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as GroupsApi from "lib/groupsApi";
import { RootState } from "redux-store/store";

const initialState: {
  loading: {
    creating: boolean;
    reading: boolean;
    updating: boolean;
    deleting: boolean;
  };
  groups: GroupProp[];
  pastGroups: GroupProp[];
  group: string | null;
  error: SerializedError | null;
} = {
  loading: {
    creating: false,
    reading: false,
    updating: false,
    deleting: false,
  },
  groups: [],
  pastGroups: [],
  group: null,
  error: null,
};

export const joinGroup = createAsyncThunk<
  boolean,
  string,
  { state: RootState }
>("groups/join", async (id, { getState, dispatch }) => {
  await GroupsApi.joinGroup(id, getState().user.data?.id!);
  dispatch(readGroups(null));
  return true;
});

export const createGroup = createAsyncThunk<
  GroupProp,
  { name: string },
  { state: RootState }
>("groups/create", async (data, { getState }) => {
  return await GroupsApi.createGroup({
    id: "",
    name: data.name,
    members: [getState().user.data?.id!],
  });
});

export const deleteGroup = createAsyncThunk<
  boolean,
  null,
  { state: RootState }
>("groups/delete", async (_, { getState }) => {
  return await GroupsApi.deleteGroup(getState().user.data?.id!);
});

export const readGroups = createAsyncThunk<
  GroupProp[],
  null,
  { state: RootState }
>("groups/read", async (_, { getState }) => {
  return await GroupsApi.readGroups(getState().user.data?.id!);
});

export const updateGroup = createAsyncThunk<
  Partial<GroupProp>,
  Partial<GroupProp>,
  { state: RootState }
>("groups/update", async (data, { getState }) => {
  return await GroupsApi.updateGroup(getState().user.data?.id!, data);
});

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    undo: (state) => {
      state.groups = state.pastGroups;
    },
    update: (state, action) => {
      state.pastGroups = state.groups;
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readGroups.pending, (state) => {
      state.loading.reading = true;
    });
    builder.addCase(readGroups.fulfilled, (state, action) => {
      state.loading.reading = false;
      state.groups = action.payload;
    });
    builder.addCase(readGroups.rejected, (state, action) => {
      state.loading.reading = false;
      state.error = action.error;
    });
    builder.addCase(createGroup.pending, (state) => {
      state.loading.creating = true;
    });
    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.loading.creating = false;
      state.groups = [...state.groups, action.payload];
      state.group = action.payload.id;
      state.error = null;
    });
    builder.addCase(createGroup.rejected, (state, action) => {
      state.loading.creating = false;
      state.error = action.error;
    });
    builder.addCase(updateGroup.pending, (state, action) => {
      state.loading.updating = true;
    });
    builder.addCase(updateGroup.fulfilled, (state, action) => {
      state.pastGroups = state.groups;
      state.groups = state.groups.map((item) =>
        item.id === state.group ? { ...item, ...action.payload } : item
      );
      state.loading.updating = false;
    });
    builder.addCase(updateGroup.rejected, (state, action) => {
      state.error = action.error;
      state.loading.updating = false;
    });
    builder.addCase(deleteGroup.pending, (state) => {
      state.loading.deleting = true;
    });
    builder.addCase(deleteGroup.fulfilled, (state) => {
      state.pastGroups = state.groups;
      state.groups = state.groups.filter((item) => item.id !== state.group);
      state.group = null;
      state.loading.deleting = false;
    });
    builder.addCase(deleteGroup.rejected, (state, action) => {
      state.error = action.error;
      state.loading.deleting = false;
    });
    builder.addCase(joinGroup.pending, (state) => {
      state.loading.updating = true;
    });
    builder.addCase(joinGroup.fulfilled, (state, payload) => {
      state.pastGroups = state.groups;
      state.groups = state.groups.filter((item) => item.id !== state.group);
      state.group = null;
      state.loading.updating = false;
    });
    builder.addCase(joinGroup.rejected, (state, action) => {
      state.error = action.error;
      state.loading.updating = false;
    });
  },
});

export const { setGroup, undo, update } = groupsSlice.actions;

export default groupsSlice.reducer;
