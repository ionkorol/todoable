import {
  MODAL_GROUPS_SET_SHOW,
  MODAL_INVITE_GROUP_SET_SHOW,
  MODAL_JOIN_GROUP_SET_SHOW,
  MODAL_NEW_GROUP_SET_SHOW,
} from "redux-store/actions/types";
import store from "redux-store/store";

const dispatch = store.dispatch;

export const showGroupsModal = (show: boolean) =>
  dispatch({
    type: MODAL_GROUPS_SET_SHOW,
    payload: show,
  });

export const showNewGroupModal = (show: boolean) =>
  dispatch({
    type: MODAL_NEW_GROUP_SET_SHOW,
    payload: show,
  });
export const showJoinGroupModal = (show: boolean) =>
  dispatch({
    type: MODAL_JOIN_GROUP_SET_SHOW,
    payload: show,
  });
export const showInviteGroupModal = (show: boolean) =>
  dispatch({
    type: MODAL_INVITE_GROUP_SET_SHOW,
    payload: show,
  });
