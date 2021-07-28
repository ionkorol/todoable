import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Heading,
  Icon,
  IconButton,
  Pressable,
  Text as NBText,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ListProp } from "utils/interfaces";
import { useDispatch } from "react-redux";
import { SELECTED_SET_LIST } from "redux-store/actions/types";
import { Text as RNText } from "react-native";
import { deleteList } from "lib/list";

interface Props {
  item: ListProp;
}

const ListItem: React.FC<Props> = (props) => {
  const { item } = props;
  const [showDelete, setShowDelete] = useState(false);
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
      onLongPress={() => setShowDelete(!showDelete)}
    >
      {showDelete && (
        <IconButton
          icon={
            <Icon
              color="success.500"
              size="sm"
              as={<Feather name="edit-2" />}
            />
          }
          position="absolute"
          right="0"
          top="0"
          onPress={() => nav.navigate("UpdateList", { listId: item.id })}
        />
      )}
      <Icon as={<Feather name="list" />} color="primary.500" mb={2} />
      <RNText
        style={{ fontSize: 70, fontWeight: "bold", marginBottom: 10 }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.1}
      >
        {item.name}
      </RNText>
      <NBText color="muted.500">{item.tasks.length} Tasks</NBText>
    </Pressable>
  );
};

export default ListItem;
