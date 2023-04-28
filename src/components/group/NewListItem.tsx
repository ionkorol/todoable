import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OurPressable } from "components/ui";
import { Icon } from "native-base";
import React from "react";

const NewListItem = () => {
  const nav = useNavigation();
  const handleClick = () => {
    nav.navigate("ListAction");
  };
  return (
    <OurPressable
      p={5}
      mt={2}
      backgroundColor="primary.50"
      borderRadius={10}
      alignItems="center"
      justifyContent="center"
      onPress={handleClick}
    >
      <Icon as={Feather} name="plus" size="md" color="primary.500" />
    </OurPressable>
  );
};

export default NewListItem;
