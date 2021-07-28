import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setTaskStatus } from "lib/task";
import { Box, Checkbox, Icon, Pressable, Text } from "native-base";
import React from "react";
import { TaskProp } from "utils/interfaces";

interface Props {
  item: TaskProp;
}

const TaskItem: React.FC<Props> = (props) => {
  const { item } = props;

  const nav = useNavigation();

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py={2}
      px={5}
    >
      <Checkbox
        value={item.name}
        isChecked={item.status === "complete"}
        accessibilityLabel="Complete Task Checkbox"
        colorScheme="success"
        _text={{ bold: true }}
        accessible
        onChange={(isSelected) =>
          isSelected
            ? setTaskStatus(item.id, "complete")
            : setTaskStatus(item.id, "active")
        }
      >
        {item.name}
      </Checkbox>

      <Icon
        onPress={() =>
          nav.navigate("Task", {
            taskId: item.id,
          })
        }
        as={<Feather name="info" />}
        color="success.500"
        size="sm"
      />
    </Box>
  );
};

export default TaskItem;
