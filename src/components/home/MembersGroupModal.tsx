import React, { useEffect, useState } from "react";
import { Avatar, Divider, FlatList, Heading, HStack, Modal } from "native-base";
import { showMembersGroupModal } from "lib/modals";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { UserProp } from "utils/interfaces";
import { getMembers } from "lib/group/members";

const MembersGroupModal = () => {
  const [data, setData] = useState<UserProp[]>([]);
  const show = useSelector((state: RootState) => state.modals.membersGroup);

  const onClose = () => showMembersGroupModal(false);

  const handleGetMembers = async () => {
    setData(await getMembers());
  };

  useEffect(() => {
    if (show) {
      handleGetMembers();
    }
  }, [show]);

  return (
    <Modal isOpen={show} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Group Members</Modal.Header>
        <Modal.Body>
          <FlatList
            data={data}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <HStack space={5} py={2}>
                <Avatar size="sm">
                  {item.name
                    .split(/\s/)
                    .reduce(
                      (response: any, word: any) =>
                        (response += word.slice(0, 1)),
                      ""
                    )}
                </Avatar>
                <Heading size="sm">{item.name}</Heading>
              </HStack>
            )}
            keyExtractor={(item) => item.id}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default MembersGroupModal;
