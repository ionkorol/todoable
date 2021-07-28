import { Feather } from "@expo/vector-icons";
import { Layout } from "components/common";
import ListsView from "components/lists/ListsView";
import {
  Box,
  HStack,
  VStack,
  Text,
  Heading,
  Avatar,
  Icon,
  Button,
  Spinner,
  Center,
  Divider,
  IconButton,
  Pressable,
} from "native-base";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GroupProp } from "utils/interfaces";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  GroupsModal,
  InviteGroupModal,
  NewGroupModal,
  JoinGroupModal,
  MembersGroupModal,
} from "components/home";
import { getGroup } from "lib/group";
import { RootState } from "redux-store/store";
import {
  showGroupsModal,
  showInviteGroupModal,
  showMembersGroupModal,
  showNewGroupModal,
} from "lib/modals";

interface Props {}

const Main: FC<Props> = (props) => {
  const [data, setData] = useState<GroupProp | null>(null);
  const [noGroups, setNoGroups] = useState<boolean | null>(null);
  const user = useSelector((state: RootState) => state.user.data!);
  const nav = useNavigation();

  const handleGetGroup = async () => {
    const res = await getGroup(user.selectedGroup);
    if (res) {
      setData(res);
    } else {
      setNoGroups(true);
      console.log("Error");
    }
  };

  // Get Groups
  useFocusEffect(
    useCallback(() => {
      handleGetGroup();
    }, [user.selectedGroup])
  );

  useEffect(() => {
    if (noGroups) {
      showNewGroupModal(true);
    }
  }, [noGroups]);

  if (!data) {
    return (
      <React.Fragment>
        <Center>
          <Spinner />
        </Center>
        <NewGroupModal />
      </React.Fragment>
    );
  }

  return (
    <Layout>
      <HStack mt={5} px={5} space={5}>
        <IconButton
          onPress={() => showMembersGroupModal(true)}
          icon={<Icon as={<Feather name="users" />} />}
        />
        <Button
          startIcon={<Icon as={<Feather name="users" />} size="sm" />}
          variant="outline"
          onPress={() => showGroupsModal(true)}
          flex={1}
        >
          {data.name}
        </Button>
        <IconButton
          onPress={() => showInviteGroupModal(true)}
          icon={<Icon as={<Feather name="user-plus" />} />}
        />
      </HStack>

      <Pressable onPress={() => nav.navigate("Account")} my={5}>
        <Divider />
        <HStack p={5} justifyContent="space-between" alignItems="center">
          <VStack>
            <Text color="primary.500">Hello</Text>
            <Heading color="success.500">{user.name}</Heading>
          </VStack>
          <Avatar bgColor="secondary.500">
            {user.name
              .split(/\s/)
              .reduce(
                (response: any, word: any) => (response += word.slice(0, 1)),
                ""
              )}
          </Avatar>
        </HStack>
        <Divider />
      </Pressable>
      <Box px={5}>
        <Heading>Lists</Heading>
      </Box>
      <Box flex={1}>
        <ListsView />
      </Box>

      <NewGroupModal />
      <GroupsModal />
      <InviteGroupModal />
      <JoinGroupModal />
      <MembersGroupModal />
    </Layout>
  );
};

export default Main;
