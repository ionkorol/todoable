import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, Icon, Pressable, Text } from "native-base";
import React from "react";

const NewListItem = () => {
  const nav = useNavigation();
  const handleClick = () => {
    nav.navigate('NewList')
  };
  return (
    <Pressable
      bgColor="white"
      p={10}
      width="50%"
      border={1}
      borderColor="muted.200"
      alignItems="center"
      justifyContent="center"
      onPress={handleClick}
    >
      <Icon as={<Feather name="plus" />} color="primary.500" mb={3} />
    </Pressable>
  );
};

export default NewListItem;
