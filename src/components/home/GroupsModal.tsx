import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ScrollView,
  Text,
  Spinner,
  Pressable,
  Icon,
} from "native-base";
import { GroupProp } from "utils/interfaces";
import { RootState } from "redux-store/store";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { MODAL_NEW_GROUP_SET_SHOW } from "redux-store/actions/types";
import { getGroups, setGroup } from "lib/group";
import { showGroupsModal, showJoinGroupModal } from "lib/modals";

interface Props {}

const GroupsModal: React.FC<Props> = (props) => {
  const [data, setData] = useState<GroupProp[]>([]);
  const dispatch = useDispatch();

  const show = useSelector((state: RootState) => state.modals.groups);
  const user = useSelector((state: RootState) => state.user.data);

  const onClose = () => showGroupsModal(false);

  const showNewGroupModal = () => {
    dispatch({
      type: MODAL_NEW_GROUP_SET_SHOW,
      payload: true,
    });
    onClose();
  };

  const handleGetGroups = async () => {
    const res = await getGroups();
    if (res) {
      setData(res);
    } else {
      console.log("Error");
    }
  };
  useEffect(() => {
    handleGetGroups();
  }, [user?.groups]);

  if (!data) {
    return (
      <Modal>
        <Modal.Content>
          <Modal.Body>
            <Spinner />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Select Group</Modal.Header>
        <Modal.Body>
          <ScrollView>
            {data.map((group) => (
              <Pressable
                onPress={() => setGroup(group.id)}
                border={1}
                borderColor="muted.200"
                p={5}
                flexDirection="row"
                justifyContent="space-between"
                key={group.id}
              >
                <Text bold>{group.name}</Text>
                {user?.selectedGroup === group.id && (
                  <Icon as={<Feather name="check" />} color="secondary.500" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </Modal.Body>
        <Modal.Footer justifyContent="space-between">
          <Button size="xs" onPress={showNewGroupModal}>
            Create Group
          </Button>
          <Button onPress={() => showJoinGroupModal(true)} size="sm">
            Join Group
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default GroupsModal;
