import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  groups: boolean;
  newGroup: boolean;
  inviteGroup: boolean;
  joinGroup: boolean;
  groupMembers: boolean;
} = {
  groups: false,
  newGroup: false,
  inviteGroup: false,
  joinGroup: false,
  groupMembers: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    modalGroupsShow: (state, action) => {
      state.groups = action.payload;
      state.groupMembers = false;
      state.inviteGroup = false;
    },
    modalGroupMembersShow: (state, action) => {
      state.groupMembers = action.payload;
      state.groups = false;
      state.inviteGroup = false;
    },
    modalNewGroupShow: (state, action) => {
      state.newGroup = action.payload;
      state.joinGroup = false;
    },
    modalInviteGroupShow: (state, action) => {
      state.inviteGroup = action.payload;
      state.groups = false;
      state.groupMembers = false;
    },
    modalJoinGroupShow: (state, action) => {
      state.joinGroup = action.payload;
      state.newGroup = false;
    },
  },
});

export const {
  modalGroupMembersShow,
  modalGroupsShow,
  modalInviteGroupShow,
  modalJoinGroupShow,
  modalNewGroupShow,
} = modalsSlice.actions;
export default modalsSlice.reducer;
