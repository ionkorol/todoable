import { Feather } from "@expo/vector-icons";
import { Layout } from "components/common";
import { logOut } from "lib/user";
import {
  Box,
  Divider,
  HStack,
  VStack,
  Heading,
  Avatar,
  Text,
  Pressable,
  Icon,
} from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

const account = () => {
  const user = useSelector((state: RootState) => state.user.data!);

  return (
    <Layout>
      <Box my={5}>
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
      </Box>
      <Box>
        <Divider />
        <Pressable onPress={logOut}>
          <HStack p={[3, 5]}>
            <Icon as={<Feather name="log-out" />} mr={3} />
            <Text fontSize="2xl">Log Out</Text>
          </HStack>
        </Pressable>
        <Divider />
      </Box>
    </Layout>
  );
};

export default account;
