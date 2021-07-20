import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Heading, Icon, Pressable, Text } from "native-base";
import React from "react";
import { ListProp } from "utils/interfaces";
import { useDispatch } from "react-redux";
import { SELECTED_SET_LIST } from "redux-store/actions/types";

interface Props {
  item: ListProp;
}

const ListItem: React.FC<Props> = (props) => {
  const { item } = props;
  const nav = useNavigation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: SELECTED_SET_LIST, payload: item.id });
    nav.navigate("List");
  };

  return (
    <Pressable
      bgColor="white"
      p={10}
      width="50%"
      border={1}
      borderColor="muted.200"
      alignItems="center"
      onPress={handleClick}
    >
      <Icon as={<Feather name="list" />} color="primary.500" mb={3} />
      <Heading>{item.name}</Heading>
      <Text color="muted.500">{item.tasks.length} Tasks</Text>
    </Pressable>
  );
};

export default ListItem;
