import { Feather } from "@expo/vector-icons";
import { deleteProgress } from "lib/task/progress";
import moment from "moment";
import { Avatar, Heading, HStack, Icon, IconButton, Text } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { TaskProgressProp } from "utils/interfaces";

interface Props {
  data: TaskProgressProp;
  taskId: string;
}

const ProgressItem: React.FC<Props> = (props) => {
  const { data, taskId } = props;
  const user = useSelector((state: RootState) => state.user.data);

  const timeSince = () => {
    const now = moment();

    const days = now.diff(data.createdAt, "days");
    if (days) {
      return `${days}d`;
    }

    const hours = now.diff(data.createdAt, "hours");
    if (hours) {
      return `${hours}h`;
    }
    const minutes = now.diff(data.createdAt, "minutes");
    if (minutes) {
      return `${minutes}m`;
    }
    const seconds = now.diff(data.createdAt, "seconds");
    if (seconds) {
      return `${seconds}s`;
    }
  };

  return (
    <HStack alignItems="center" py={1}>
      <HStack alignItems="center" flex={1}>
        <Avatar size="xs">
          {data.user.name
            .split(/\s/)
            .reduce(
              (response: any, word: any) => (response += word.slice(0, 1)),
              ""
            )}
        </Avatar>
        <Heading size="sm">{data.user.name}: </Heading>
        <Text flex={1}>{data.description}</Text>
      </HStack>
      <HStack alignItems="center">
        <Text>{timeSince()}</Text>
        <IconButton
          icon={<Icon size="xs" color="error.500" as={<Feather name="x" />} />}
          onPress={() => deleteProgress(taskId, data.id)}
          disabled={user?.id !== data.user.id}
        />
      </HStack>
    </HStack>
  );
};

export default ProgressItem;
