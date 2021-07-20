import { showInviteGroupModal } from "lib/modals";
import { VStack, FormControl, Input, Modal, ScrollView } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

const InviteGroupModal = () => {
  const show = useSelector((state: RootState) => state.modals.inviteGroup);
  const onClose = () => showInviteGroupModal(false);
  const groupId = useSelector(
    (state: RootState) => state.user.data?.selectedGroup
  );
  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Join Group</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={10} mt={5}>
              <FormControl>
                <FormControl.Label
                  _text={{ color: "muted.500", fontSize: "sm", bold: true }}
                >
                  ID
                </FormControl.Label>
                <Input value={groupId} isDisabled />
              </FormControl>
            </VStack>
          </ScrollView>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default InviteGroupModal;
