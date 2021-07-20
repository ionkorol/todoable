import { joinGroup } from "lib/group";
import { showJoinGroupModal } from "lib/modals";
import {
  VStack,
  FormControl,
  Input,
  Modal,
  ScrollView,
  Button,
} from "native-base";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

const JoinGroupModal = () => {
  const [id, setID] = useState("");
  const show = useSelector((state: RootState) => state.modals.joinGroup);
  const onClose = () => showJoinGroupModal(false);
  const handleSubmit = () => {
    joinGroup(id);
    onClose();
  };

  console.log(show)

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
                <Input value={id} onChange={(e) => setID(e.nativeEvent.text)} />
              </FormControl>
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={handleSubmit}>Join Group</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default JoinGroupModal;
