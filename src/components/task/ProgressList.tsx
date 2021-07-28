import { FormControl, Divider, FlatList, Text } from "native-base";
import React, { useEffect, useState } from "react";
import ProgressItem from "components/task/ProgressItem";
import { TaskProgressProp, TaskProp } from "utils/interfaces";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { getUser } from "lib/user";
import ProgressAdd from "./ProgressAdd";

interface Props {
  taskId: string;
}

const ProgressList: React.FC<Props> = (props) => {
  const { taskId } = props;
  const [data, setData] = useState<TaskProgressProp[]>([]);

  const selected = useSelector((state: RootState) => state.selected);
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("groups")
      .doc(user?.selectedGroup)
      .collection("lists")
      .doc(selected.list!)
      .collection("tasks")
      .doc(taskId)
      .collection("progress")
      .onSnapshot(async (query) => {
        let progressData: any[] = [];
        for (const progressSnap of query.docs) {
          const progressDoc = progressSnap.data();
          const userData = await getUser(progressDoc.user);
          progressData = [...progressData, { ...progressDoc, user: userData }];
        }
        setData(progressData as TaskProgressProp[]);
      });

    return () => unsub();
  }, [taskId]);

  return (
    <FormControl>
      <FormControl.Label>Progress</FormControl.Label>
      <FlatList
        data={data.sort((a, b) => b.createdAt - a.createdAt)}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <ProgressItem data={item} taskId={taskId} />}
        ListFooterComponent={<ProgressAdd taskId={taskId} />}
        ListEmptyComponent={
          <Text p={2} color="muted.500">
            No Progress
          </Text>
        }
        keyExtractor={(item) => item.id}
      />
    </FormControl>
  );
};

export default ProgressList;
