import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  Icon,
  IconButton,
  Pressable,
  Text as NBText,
  VStack,
} from "native-base";
import React from "react";
import { ListProp } from "utils/interfaces";
import { useDispatch } from "react-redux";
import { SELECTED_SET_LIST } from "redux-store/actions/types";
import { Text as RNText } from "react-native";
import { selectList } from "lib/list";

interface Props {
  item: ListProp;
}

const ListItem: React.FC<Props> = (props) => {
  const { item } = props;
  const nav = useNavigation();
  const handleClick = () => {
    selectList(item.id);
    nav.navigate("List");
  };

  const getCompleteTasks = () => {
    return item.tasks.filter((item) => item.status === "complete").length
  };

  return (
    <Pressable
      bgColor="white"
      flexDirection="row"
      p={5}
      width="100%"
      border={1}
      borderColor="muted.200"
      alignItems="center"
      onPress={handleClick}
    >
      <Icon size="lg" mr={2} as={<Feather name="list" />} color="muted.500" />

      <VStack flex={1}>
        <Heading size="md">{item.name}</Heading>
        <NBText color="muted.500">
          {getCompleteTasks()} Completed / {item.tasks.length} Total
        </NBText>
      </VStack>
      <IconButton
        icon={
          <Icon color="success.500" size="sm" as={<Feather name="edit-2" />} />
        }
        onPress={() => nav.navigate("UpdateList", { listId: item.id })}
      />
    </Pressable>
  );
};

export default ListItem;
