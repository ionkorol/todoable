import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setTaskStatus } from "lib/task";
import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import { TaskProp } from "utils/interfaces";

interface Props {
  item: TaskProp;
}

const TaskItem: React.FC<Props> = (props) => {
  const { item } = props;

  const nav = useNavigation();

  return (
    <HStack p={2} justifyContent="space-between" alignItems="center">
      <Checkbox
        value={item.name}
        isChecked={item.status === "complete"}
        accessibilityLabel="Complete Task Checkbox"
        colorScheme="success"
        _text={{ bold: true }}
        accessible
        size="md"
        onChange={(isSelected) =>
          isSelected
            ? setTaskStatus(item.id, "complete")
            : setTaskStatus(item.id, "active")
        }
      >
        {item.name}
      </Checkbox>
      <IconButton
        onPress={() =>
          nav.navigate("Task", {
            taskId: item.id,
          })
        }
        icon={
          <Icon as={<Feather name="edit" />} color="success.500" size="sm" />
        }
      />
    </HStack>
  );
};

export default TaskItem;
