import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OurPressable } from "components/ui";
import { useAppDispatch } from "hooks/redux";
import { Heading, Icon, VStack } from "native-base";
import React from "react";
import { setList } from "redux-store/slices/lists";
import { ListProp } from "utils/interfaces";

interface Props {
  item: ListProp;
}

const ListItem: React.FC<Props> = (props) => {
  const { item } = props;
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    dispatch(setList(item.id));
    nav.navigate("List");
  };

  return (
    <OurPressable
      flexDirection="row"
      p={5}
      my={2}
      borderRadius={10}
      backgroundColor={`${item.color}.50`}
      alignItems="center"
      onPress={handleClick}
    >
      <Icon
        size="lg"
        mr={2}
        as={Feather}
        name={item.icon}
        color={`${item.color}.500`}
      />

      <VStack flex={1}>
        <Heading color={`${item.color}.500`} size="md">
          {item.name}
        </Heading>
      </VStack>
    </OurPressable>
  );
};

export default ListItem;
