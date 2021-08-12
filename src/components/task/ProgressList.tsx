import { FormControl, Divider, FlatList, Text } from "native-base";
import React, { useEffect, useState } from "react";
import ProgressItem from "components/task/ProgressItem";

import ProgressAdd from "./ProgressAdd";
import * as ProgressApi from "lib/progressApi";
import { useAppSelector } from "hooks/redux";
import { ProgressProp } from "utils/interfaces";

interface Props {}

const ProgressList: React.FC<Props> = (props) => {
  const { task } = useAppSelector((state) => state.tasks);
  const [data, setData] = useState<ProgressProp[]>([]);

  useEffect(() => {
    async () => {
      setData(await ProgressApi.readProgress(task!));
    };
  }, []);

  return (
    <FormControl>
      <FormControl.Label>Progress</FormControl.Label>
      <FlatList
        nestedScrollEnabled
        data={data.sort((a, b) => b.createdAt - a.createdAt)}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <ProgressItem data={item} />}
        ListFooterComponent={<ProgressAdd />}
        ListEmptyComponent={
          <Text p={2} color="muted.500">
            No Progress
          </Text>
        }
        keyExtractor={(item) => item.id}
        // onRefresh={getProgress}
        // refreshing={loading}
      />
    </FormControl>
  );
};

export default ProgressList;
