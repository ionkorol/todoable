import { Feather } from "@expo/vector-icons";
import { archiveTask, setTaskStatus } from "lib/task";
import { Checkbox, Icon, Pressable, Text } from "native-base";
import React from "react";
import { TaskProp } from "utils/interfaces";

interface Props {
  item: TaskProp;
}

const TaskItem: React.FC<Props> = (props) => {
  const { item } = props;

  return (
    <Pressable p={5} flexDirection="row" justifyContent="space-between">
      <Checkbox
        value={item.name}
        isChecked={item.status === "complete"}
        colorScheme="success"
        _text={{ bold: true }}
        onChange={(isSelected) =>
          isSelected
            ? setTaskStatus(item.id, "complete")
            : setTaskStatus(item.id, "active")
        }
      >
        {item.name}
      </Checkbox>
      <Icon
        onPress={() => archiveTask(item.id)}
        as={<Feather name="trash" />}
        color="error.100"
        size="sm"
      />
    </Pressable>
  );
};

export default TaskItem;
