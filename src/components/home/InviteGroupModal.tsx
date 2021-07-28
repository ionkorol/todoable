import { Feather } from "@expo/vector-icons";
import { showInviteGroupModal } from "lib/modals";
import { Input, Modal, HStack, IconButton, Icon } from "native-base";
import React, { useState } from "react";
import { Share } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

const InviteGroupModal = () => {
  const [error, setError] = useState(null);
  const show = useSelector((state: RootState) => state.modals.inviteGroup);
  const onClose = () => showInviteGroupModal(false);
  const groupId = useSelector(
    (state: RootState) => state.user.data?.selectedGroup
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: groupId!,
      });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Invite Members</Modal.Header>
        <Modal.Body>
          <HStack space={5} mt={5}>
            <Input variant="filled" value={groupId} />
            <IconButton
              colorScheme="success"
              icon={
                <Icon
                  size="sm"
                  color="success.500"
                  as={<Feather name="share" />}
                />
              }
              onPress={onShare}
            />
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default InviteGroupModal;
