import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { OurPressable } from "components/ui";
import { useAppDispatch } from "hooks/redux";
import { updateTask } from "lib/tasksApi";

import { Heading, HStack, Icon, IconButton, Spinner } from "native-base";
import React, { useState } from "react";
import { setTask } from "redux-store/slices/tasks";
import { TaskProp } from "utils/interfaces";

interface Props {
  item: TaskProp;
}

const TaskItem: React.FC<Props> = (props) => {
  const { item } = props;
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <OurPressable
      flexDirection="row"
      backgroundColor="primary.50"
      borderRadius={10}
      m={1}
      px={1}
      borderColor="primary.50"
      alignItems="center"
      onPress={() => {
        dispatch(setTask(item.id));
        nav.navigate("Task");
      }}
      onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
    >
      <HStack space={2} alignItems="center">
        <OurPressable
          justifyContent="center"
          alignItems="center"
          width={height - 7}
          height={height - 7}
          backgroundColor={
            loading
              ? "white"
              : item.status === "active"
              ? "white"
              : "primary.500"
          }
          borderRadius={10}
          onPress={async () => {
            setLoading(true);
            await updateTask(item.id, {
              status: item.status === "active" ? "complete" : "active",
            });
            setLoading(false);
          }}
        >
          {item.status === "complete" && !loading && (
            <Icon as={Feather} name="check" color="white" size="lg" />
          )}
          {loading && <Spinner />}
        </OurPressable>

        <Heading
          flex={1}
          color={item.status === "complete" ? "primary.300" : undefined}
          size="md"
        >
          {item.name}
        </Heading>

        <IconButton
          onPress={() => {
            dispatch(setTask(item.id));
            nav.navigate("Task");
          }}
          icon={<Icon as={Feather} name="edit" />}
        />
      </HStack>
    </OurPressable>
  );
};

export default TaskItem;
