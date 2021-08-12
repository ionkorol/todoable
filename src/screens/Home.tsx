import { Layout, UserAvatar } from "components/common";
import { ListsList } from "components/group";
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Icon,
  Spinner,
  Center,
  IconButton,
} from "native-base";
import React, { FC, useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  GroupsModal,
  InviteGroupModal,
  NewGroupModal,
  JoinGroupModal,
  MembersGroupModal,
} from "components/home";
import { Feather } from "@expo/vector-icons";
import {
  modalGroupMembersShow,
  modalGroupsShow,
  modalInviteGroupShow,
} from "redux-store/slices/modals";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { LogBox } from "react-native";
import { OurPressable } from "components/ui";
import firebase from "firebase";
import * as groupsActions from "redux-store/slices/groups";
import * as listsActions from "redux-store/slices/lists";

LogBox.ignoreLogs([
  "NativeBase: The contrast ratio of 2.156108603821344:1 for primary.500 on transparent",
  "NativeBase: The contrast ratio of 1:1 for darkText on transparent",
]);

interface Props {}

const Main: FC<Props> = (props) => {
  const { group, groups } = useAppSelector((state) => state.groups);
  const user = useAppSelector((state) => state.user.data!);
  const data = useAppSelector((state) =>
    state.groups.groups.find((item) => item.id === group)
  );

  const showGroups = useAppSelector((state) => state.modals.groups);
  const showInvite = useAppSelector((state) => state.modals.inviteGroup);
  const showMembers = useAppSelector((state) => state.modals.groupMembers);

  const nav = useNavigation();
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (!groups.length) {
        dispatch(groupsActions.readGroups(null));
      }

      const unsubGroups = firebase
        .firestore()
        .collection("groups")
        .where("members", "array-contains", user.id)
        .onSnapshot((query) => {
          dispatch(groupsActions.update(query.docs.map((doc) => doc.data())));
        });

      return () => unsubGroups();
    }, [])
  );

  useEffect(() => {
    if (!group && groups.length) {
      dispatch(groupsActions.setGroup(groups[0].id));
    }
  }, [groups]);

  useEffect(() => {
    if (group) {
      const unsubLists = firebase
        .firestore()
        .collection("lists")
        .where("group", "==", group)
        .onSnapshot((query) => {
          dispatch(listsActions.update(query.docs.map((doc) => doc.data())));
        });

      return () => unsubLists();
    }
  }, [group]);

  if (!data) {
    return (
      <React.Fragment>
        <Center flex={1}>
          <Spinner />
        </Center>
      </React.Fragment>
    );
  }
  return (
    <Layout>
      <VStack space={3} p={3}>
        <HStack space={3}>
          <IconButton
            onPress={() => dispatch(modalGroupMembersShow(!showMembers))}
            icon={<Icon as={Feather} name="users" />}
          />
          <OurPressable
            backgroundColor="primary.50"
            px={4}
            py={2}
            borderRadius={10}
            justifyContent="center"
            onPress={() => {
              dispatch(modalGroupsShow(!showGroups));
            }}
            flex={1}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="md">{data.name}</Heading>
              <Icon as={Feather} name="refresh-cw" />
            </HStack>
          </OurPressable>
          <IconButton
            onPress={() => dispatch(modalInviteGroupShow(!showInvite))}
            icon={<Icon as={Feather} name="user-plus" />}
          />
        </HStack>

        <OurPressable
          flexDirection="row"
          borderRadius={10}
          backgroundColor="primary.50"
          onPress={() => nav.navigate("Account")}
          p={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack>
            <Text color="primary.500">Hello</Text>
            <Heading>{user.name}</Heading>
          </VStack>
          <UserAvatar />
        </OurPressable>
        <ListsList />
      </VStack>

      <NewGroupModal />
      <GroupsModal />
      <InviteGroupModal />
      <JoinGroupModal />
      <MembersGroupModal />
    </Layout>
  );
};

export default Main;
