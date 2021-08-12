import { configureStore } from "@reduxjs/toolkit";
import {
  modalsReducer,
  userReducer,
  groupsReducer,
  listsReducer,
  tasksReducer,
  progressReducer,
  membersReducer,
} from "./slices";

const store = configureStore({
  reducer: {
    modals: modalsReducer,
    user: userReducer,
    groups: groupsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
    progress: progressReducer,
    members: membersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
