import { Reducer } from "redux";
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_CLEAR,
} from "redux-store/actions/types";
import { UserProp } from "utils/interfaces";

const initialState = {
  isAuthenticated: false,
  loading: false,
  data: null,
  error: null,
} as {
  isAuthenticated: boolean;
  loading: boolean;
  data: UserProp | null;
  error: string | null;
};

const userReducer: Reducer<
  typeof initialState,
  { type: string; payload: any }
> = (state = initialState, action) => {
  switch (action.type) {
    case USER_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        data: action.payload,
        error: null,
      };
    case USER_GET_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        data: null,
        error: action.payload,
      };

    case USER_CLEAR:
      return {
        ...state,
        isAuthenticated: false,
        data: null,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
