import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  FormControl,
  VStack,
  Input,
  Button,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { MODAL_NEW_GROUP_SET_SHOW } from "redux-store/actions/types";
import { createGroup } from "lib/group";

interface Props {}

const NewGroupModal: React.FC<Props> = (props) => {
  const show = useSelector((state: RootState) => state.modals.newGroup);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const res = await createGroup({ name } as any);
    if (res) {
      onClose();
    } else {
      console.log("error");
    }
  };

  const onClose = () =>
    dispatch({ type: MODAL_NEW_GROUP_SET_SHOW, payload: false });

  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Create Group</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <VStack space={10} mt={5}>
              <FormControl>
                <FormControl.Label
                  _text={{ color: "muted.500", fontSize: "sm", bold: true }}
                >
                  Name
                </FormControl.Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.nativeEvent.text)}
                />
              </FormControl>
            </VStack>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={handleSubmit}>Create Group</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default NewGroupModal;
