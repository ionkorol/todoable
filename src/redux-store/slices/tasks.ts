import { TaskProp } from "utils/interfaces";
import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import * as TaskApi from "lib/tasksApi";
import { RootState } from "redux-store/store";

export const setTaskState = createAsyncThunk<
  Partial<TaskProp>,
  { id: string; status: "active" | "complete" },
  { state: RootState }
>("tasks/setState", async (data, { getState }) => {
  return await TaskApi.updateTask(data.id, {
    status: data.status,
  });
});

export const createTask = createAsyncThunk<
  TaskProp,
  { name: string },
  { state: RootState }
>("tasks/create", async (data, { getState }) => {
  return await TaskApi.createTask({
    id: "",
    name: data.name,
    description: "",
    createdAt: Date.now(),
    status: "active",
    list: getState().lists.list!,
    group: getState().groups.group!,
  });
});

export const deleteTask = createAsyncThunk<boolean, null, { state: RootState }>(
  "tasks/delete",
  async (_, { getState, dispatch }) => {
    return await TaskApi.deleteTask(getState().tasks.task!);
  }
);

export const readTasks = createAsyncThunk<
  TaskProp[],
  null,
  { state: RootState }
>("tasks/read", async (_, { getState, dispatch }) => {
  return await TaskApi.readTasks(getState().lists.list!);
});

export const updateTask = createAsyncThunk<
  Partial<TaskProp>,
  Partial<TaskProp>,
  { state: RootState }
>("tasks/update", async (data, { getState, dispatch }) => {
  return await TaskApi.updateTask(getState().tasks.task!, data);
});

const initialState: {
  loading: {
    creating: boolean;
    reading: boolean;
    updating: boolean;
    deleting: boolean;
  };
  tasks: TaskProp[];
  pastTasks: TaskProp[];
  filters: {
    showComplete: boolean;
  };
  task: string | null;
  error: SerializedError | null;
} = {
  loading: {
    creating: false,
    reading: false,
    updating: false,
    deleting: false,
  },
  filters: {
    showComplete: true,
  },
  tasks: [],
  pastTasks: [],
  task: null,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    undo: (state) => {
      state.tasks = state.pastTasks;
    },
    showComplete: (state, action) => {
      state.filters.showComplete = action.payload;
    },
    update: (state, action) => {
      state.pastTasks = state.tasks;
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readTasks.pending, (state) => {
      state.loading.reading = true;
    });
    builder.addCase(readTasks.fulfilled, (state, action) => {
      state.pastTasks = state.tasks;
      state.tasks = action.payload;
      state.loading.reading = false;
    });
    builder.addCase(readTasks.rejected, (state, action) => {
      state.error = action.error;
      state.loading.reading = false;
    });

    builder.addCase(updateTask.pending, (state, action) => {
      state.loading.updating = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.pastTasks = state.tasks;
      state.tasks = state.tasks.map((item) =>
        item.id === state.task ? { ...item, ...action.payload } : item
      );
      state.loading.updating = false;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.error = action.error;
      state.loading.updating = false;
    });

    builder.addCase(createTask.pending, (state) => {
      state.loading.creating = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading.creating = false;
      state.pastTasks = state.tasks;
      state.tasks = [...state.tasks, action.payload];
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading.creating = false;
      state.error = action.error;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading.deleting = true;
    });
    builder.addCase(deleteTask.fulfilled, (state) => {
      state.pastTasks = state.pastTasks;
      state.tasks = state.tasks.filter((item) => item.id !== state.task);
      state.task = null;
      state.loading.deleting = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading.deleting = false;
      state.error = action.error;
    });

    builder.addCase(setTaskState.pending, (state, payload) => {
      state.loading.updating = true;
      state.pastTasks = state.tasks;
      state.tasks = state.tasks.map((item) =>
        item.id === payload.meta.arg.id
          ? { ...item, status: payload.meta.arg.status }
          : item
      );
    });
    builder.addCase(setTaskState.fulfilled, (state) => {
      state.loading.updating = false;
    });
    builder.addCase(setTaskState.rejected, (state, action) => {
      state.loading.updating = false;
      state.tasks = state.pastTasks;
      state.error = action.error;
    });
  },
});

export default tasksSlice.reducer;
export const { setTasks, setTask, undo, showComplete, update } =
  tasksSlice.actions;
