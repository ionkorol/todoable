import { Reducer } from "redux";

import { TaskProgressProp } from "utils/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: null,
} as {
  loading: boolean;
  data: TaskProgressProp[];
  error: string | null;
};

// const progressReducer: Reducer<
//   typeof initialState,
//   { type: string; payload: any }
// > = (state = initialState, action) => {
//   switch (action.type) {
//     case PROGRESS_GET_REQUEST:
//     case PROGRESS_DELETE_REQUEST:
//     case PROGRESS_CREATE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case PROGRESS_GET_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null,
//       };

//     case PROGRESS_DELETE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: state.data.filter((item) => item.id !== action.payload),
//         error: null,
//       };

//     case PROGRESS_CREATE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: [...state.data, action.payload],
//         error: null,
//       };

//     case PROGRESS_GET_FAILURE:
//     case PROGRESS_DELETE_FAILURE:
//     case PROGRESS_CREATE_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
});

export default progressSlice.reducer;
