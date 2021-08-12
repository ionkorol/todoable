import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Layout, UserAvatar } from "components/common";
import { OurPressable } from "components/ui";
import { logOut } from "lib/user";
import { HStack, VStack, Heading, Text, Icon } from "native-base";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

const account = () => {
  const user = useSelector((state: RootState) => state.user.data!);
  const nav = useNavigation();

  useFocusEffect(useCallback(() => {}, []));

  return (
    <Layout>
      <VStack p={3} space={3}>
        <HStack
          backgroundColor="primary.50"
          borderRadius={10}
          p={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack>
            <Text>Hello</Text>
            <Heading>{user.name}</Heading>
          </VStack>
          <UserAvatar name={user.name} />
        </HStack>
        <OurPressable onPress={() => nav.navigate("Feedback")}>
          <HStack
            space={3}
            borderRadius={10}
            p={5}
            backgroundColor="primary.50"
            alignItems="center"
          >
            <Icon as={Feather} name="mail" />
            <Heading size="lg">Feedback</Heading>
          </HStack>
        </OurPressable>
        <OurPressable onPress={logOut}>
          <HStack
            space={3}
            borderRadius={10}
            p={5}
            backgroundColor="primary.50"
            alignItems="center"
          >
            <Icon as={Feather} name="log-out" />
            <Heading size="lg">Log Out</Heading>
          </HStack>
        </OurPressable>
      </VStack>
    </Layout>
  );
};

export default account;
