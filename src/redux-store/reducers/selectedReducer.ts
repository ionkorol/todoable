import { Reducer } from "redux";
import {
  SELECTED_SET_GROUP,
  SELECTED_SET_LIST,
  SELECTED_SET_TASK,
} from "redux-store/actions/types";

const initialState: {
  group: string | null;
  list: string | null;
  task: string | null;
} = {
  group: null,
  list: null,
  task: null,
};

const selectedReducer: Reducer<
  typeof initialState,
  { type: string; payload: any }
> = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECTED_SET_GROUP:
      return { ...state, group: payload };

    case SELECTED_SET_LIST:
      return { ...state, list: payload };

    case SELECTED_SET_TASK:
      return { ...state, task: payload };

    default:
      return state;
  }
};

export default selectedReducer;
