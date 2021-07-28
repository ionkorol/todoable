import {
  MODAL_GROUPS_SET_SHOW,
  MODAL_NEW_GROUP_SET_SHOW,
  MODAL_JOIN_GROUP_SET_SHOW,
  MODAL_INVITE_GROUP_SET_SHOW,
  MODAL_MEMBERS_GROUP_SET_SHOW,
} from "redux-store/actions/types";

const initialState: {
  groups: boolean;
  newGroup: boolean;
  inviteGroup: boolean;
  joinGroup: boolean;
  membersGroup: boolean;
} = {
  groups: false,
  newGroup: false,
  inviteGroup: false,
  joinGroup: false,
  membersGroup: false,
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: boolean }
) => {
  console.log(type, payload);
  switch (type) {
    case MODAL_GROUPS_SET_SHOW:
      return { ...state, groups: payload };

    case MODAL_NEW_GROUP_SET_SHOW:
      return { ...state, newGroup: payload };

    case MODAL_INVITE_GROUP_SET_SHOW:
      return { ...state, inviteGroup: payload };

    case MODAL_JOIN_GROUP_SET_SHOW:
      return { ...state, joinGroup: payload };

    case MODAL_MEMBERS_GROUP_SET_SHOW:
      return { ...state, membersGroup: payload };

    default:
      return state;
  }
};
