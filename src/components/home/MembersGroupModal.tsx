import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Divider,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  Slide,
  Spinner,
} from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { modalGroupMembersShow } from "redux-store/slices/modals";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { readMembers } from "redux-store/slices/members";
import { UserAvatar } from "components/common";
import { Feather } from "@expo/vector-icons";
import { FlingGestureHandler, Directions } from "react-native-gesture-handler";

const MembersGroupModal = () => {
  const show = useSelector((state: RootState) => state.modals.groupMembers);
  const { members } = useAppSelector((state) => state.members);
  const { groups, group } = useAppSelector((state) => state.groups);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(modalGroupMembersShow(false));

  useEffect(() => {
    if (show) {
      dispatch(readMembers(null));
    }
  }, [show, group, groups]);

  return (
    <Slide in={show}>
      <FlingGestureHandler direction={Directions.DOWN} onActivated={onClose}>
        <Box backgroundColor="muted.50" p={5}>
          <HStack justifyContent="space-between">
            <Heading>Group Members</Heading>
            <IconButton
              variant="ghost"
              icon={<Icon as={Feather} name="x" size="sm" />}
              onPress={onClose}
            />
          </HStack>
          {members.map((item) => (
            <HStack
              backgroundColor="primary.50"
              space={5}
              p={2}
              my={2}
              borderRadius={10}
              alignItems="center"
              key={item.id}
            >
              <UserAvatar />
              <Heading flex={1} size="sm">
                {item.data!.name}
              </Heading>
              {item.role === "admin" && (
                <Icon as={Feather} name="award" size="sm" />
              )}
            </HStack>
          ))}
        </Box>
      </FlingGestureHandler>
    </Slide>
  );
};

export default MembersGroupModal;
