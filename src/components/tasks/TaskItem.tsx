import { Feather } from "@expo/vector-icons";
import { archiveTask, setTaskStatus } from "lib/task";
import { Box, Checkbox, Icon, Pressable, Text } from "native-base";
import React from "react";
import { TaskProp } from "utils/interfaces";

interface Props {
  item: TaskProp;
}

const TaskItem: React.FC<Props> = (props) => {
  const { item } = props;

  return (
    <Pressable display="flex" flexDirection="row" alignItems="center">
      <Box flex={1}>
        <Checkbox
          p={5}
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
      </Box>
      <Box p={5}>
        <Icon
          onPress={() => archiveTask(item.id)}
          as={<Feather name="trash" />}
          color="error.500"
          size="sm"
        />
      </Box>
    </Pressable>
  );
};

export default TaskItem;
