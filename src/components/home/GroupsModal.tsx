import React from "react";
import {
  Button,
  Icon,
  IconButton,
  HStack,
  Slide,
  Box,
  Heading,
  Avatar,
} from "native-base";
import { RootState } from "redux-store/store";
import { useSelector } from "react-redux";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as groupActions from "redux-store/slices/groups";
import {
  modalGroupsShow,
  modalJoinGroupShow,
  modalNewGroupShow,
} from "redux-store/slices/modals";
import { useAppDispatch } from "hooks/redux";
import { OurPressable } from "components/ui";
import { Directions, FlingGestureHandler } from "react-native-gesture-handler";

interface Props {}

const GroupsModal: React.FC<Props> = (props) => {
  const { groups, group } = useSelector((state: RootState) => state.groups);

  const show = useSelector((state: RootState) => state.modals.groups);

  const dispatch = useAppDispatch();
  const onClose = () => dispatch(modalGroupsShow(false));

  return (
    <Slide in={show} placement="bottom">
      <FlingGestureHandler
        direction={Directions.DOWN}
        onActivated={(e) => onClose()}
      >
        <Box backgroundColor="muted.50" p={5} shadow={5}>
          <HStack justifyContent="space-between">
            <Heading>Groups</Heading>
            <IconButton
              variant="ghost"
              icon={<Icon as={Feather} name="x" size="sm" />}
              onPress={onClose}
            />
          </HStack>
          {groups.map((item) => (
            <OurPressable
              backgroundColor={item.id === group ? "primary.200" : "primary.50"}
              onPress={() => dispatch(groupActions.setGroup(item.id))}
              p={5}
              my={2}
              borderRadius={10}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              key={item.id}
            >
              <HStack alignItems="center" space={2}>
                <Avatar backgroundColor="muted.100">
                  <Icon as={MaterialIcons} name="groups" />
                </Avatar>
                <Heading size="md">{item.name}</Heading>
              </HStack>

              {group === item.id && (
                <IconButton
                  icon={<Icon as={Feather} name="edit-2" size="sm" />}
                />
              )}
            </OurPressable>
          ))}
          <HStack mt={5} justifyContent="space-between">
            <Button size="sm" onPress={() => dispatch(modalNewGroupShow(true))}>
              Create Group
            </Button>
            <Button
              onPress={() => dispatch(modalJoinGroupShow(true))}
              size="sm"
            >
              Join Group
            </Button>
          </HStack>
        </Box>
      </FlingGestureHandler>
    </Slide>
  );
};

export default GroupsModal;
