import { SELECTED_SET_LIST } from "redux-store/actions/types";
import store from "redux-store/store";

const selectList = (listId: string) => {
  const { dispatch } = store;

  dispatch({ type: SELECTED_SET_LIST, payload: listId });
};

export default selectList;
