import { ListProp } from "utils/interfaces";
import { createSlice, SerializedError } from "@reduxjs/toolkit";
import * as ListApi from "lib/listApi";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux-store/store";

export const createList = createAsyncThunk<
  ListProp,
  { name: string; icon: string; color: string },
  { state: RootState }
>("lists/create", async (data, { getState, dispatch }) => {
  return await ListApi.createList({
    id: "",
    createdAt: Date.now(),
    name: data.name,
    icon: data.icon,
    color: data.color,
    group: getState().groups.group!,
    author: getState().user.data?.id!,
  });
});

export const readLists = createAsyncThunk<
  ListProp[],
  null,
  { state: RootState }
>("lists/read", async (_, { getState, dispatch }) => {
  return await ListApi.readLists(getState().groups.group!);
});

export const updateList = createAsyncThunk<
  Partial<ListProp>,
  { name: string; icon: string; color: string },
  { state: RootState }
>("lists/update", async (data, { getState }) => {
  return ListApi.updateList(getState().lists.list!, data);
});

export const deleteList = createAsyncThunk<boolean, null, { state: RootState }>(
  "lists/delete",
  async (_, { getState }) => {
    return ListApi.deleteList(getState().lists.list!);
  }
);

const initialState: {
  loading: {
    creating: boolean;
    reading: boolean;
    updating: boolean;
    deleting: boolean;
  };
  lists: ListProp[];
  pastLists: ListProp[];
  list: string | null;
  error: SerializedError | null;
} = {
  loading: {
    creating: false,
    reading: false,
    updating: false,
    deleting: false,
  },
  lists: [],
  pastLists: [],
  list: null,
  error: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    undo: (state) => {
      state.lists = state.pastLists;
    },
    update: (state, action) => {
      state.pastLists = state.lists;
      state.lists = action.payload;
    },
    deleteList: (state) => {
      state.loading.deleting = false;
      state.pastLists = state.lists;
      state.lists = state.lists.filter((item) => item.id !== state.list);
      state.list = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createList.pending, (state) => {
      state.loading.creating = true;
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      state.loading.creating = false;
    });
    builder.addCase(createList.rejected, (state, action) => {
      state.error = action.error;
      state.loading.creating = false;
    });
    builder.addCase(readLists.pending, (state) => {
      state.loading.reading = true;
    });
    builder.addCase(readLists.fulfilled, (state, action) => {
      state.pastLists = state.lists;
      state.lists = action.payload;
      state.loading.reading = false;
    });
    builder.addCase(readLists.rejected, (state, action) => {
      state.error = action.error;
      state.loading.reading = false;
    });
    builder.addCase(updateList.pending, (state, action) => {
      state.loading.updating = true;
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      state.pastLists = state.lists;
      state.lists = state.lists.map((item) =>
        item.id === state.list ? { ...item, ...action.payload } : item
      );
      state.loading.updating = false;
    });

    builder.addCase(updateList.rejected, (state, action) => {
      state.error = action.error;
      state.loading.updating = false;
    });
    builder.addCase(deleteList.pending, (state) => {
      state.loading.deleting = true;
    });
    builder.addCase(deleteList.fulfilled, (state) => {
      state.pastLists = state.lists;
      state.lists = state.lists.filter((item) => item.id !== state.list);
      state.list = null;
      state.loading.deleting = false;
    });

    builder.addCase(deleteList.rejected, (state, action) => {
      state.error = action.error;
      state.loading.deleting = false;
    });
  },
});

export default listsSlice.reducer;
export const { setList, undo, update } = listsSlice.actions;
