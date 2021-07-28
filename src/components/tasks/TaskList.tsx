import { Feather } from "@expo/vector-icons";
import {
  Text,
  Pressable,
  Icon,
  FlatList,
  Divider,
  HStack,
  Input,
  IconButton,
  VStack,
  Box,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { TaskProp } from "utils/interfaces";
import TaskItem from "./TaskItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import NewTaskItem from "./NewTaskItem";
import TaskListHeader from "./TaskListHeader";

interface Props {}

const TaskList: React.FC<Props> = (props) => {
  const [rawData, setRawData] = useState<TaskProp[]>([]);
  const [cleanData, setCleanData] = useState<TaskProp[]>([]);
  const [search, setSearch] = useState("");
  const [showComplete, setShowComplete] = useState(false);

  const selected = useSelector((state: RootState) => state.selected);
  const user = useSelector((state: RootState) => state.user.data);

  useFocusEffect(
    useCallback(() => {
      const unsub = firebase
        .firestore()
        .collection("groups")
        .doc(user?.selectedGroup)
        .collection("lists")
        .doc(selected.list!)
        .collection("tasks")
        .onSnapshot(async (query) => {
          const docsData = query.docs.map((snap) => snap.data());
          setRawData(docsData as TaskProp[]);
        });
      return () => unsub();
    }, [])
  );

  const handleSearch = (terms: string) => {
    if (showComplete) {
      setCleanData(rawData.filter((item) => item.name.includes(terms)));
    } else {
      setCleanData(
        rawData.filter(
          (item) => item.name.includes(terms) && item.status !== "complete"
        )
      );
    }
    setSearch(terms);
  };

  const filterData = () =>
    showComplete
      ? setCleanData(rawData)
      : setCleanData(rawData.filter((item) => item.status === "active"));

  useEffect(() => {
    filterData();
  }, [showComplete, rawData]);

  return (
    <FlatList
      data={cleanData}
      renderItem={({ item }) => <TaskItem item={item} />}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={
        <Box>
          <Text>No Tasks</Text>
        </Box>
      }
      ListHeaderComponent={
        <TaskListHeader
          showComplete={showComplete}
          setShowComplete={setShowComplete}
          handleSearch={handleSearch}
        />
      }
      ListFooterComponent={<NewTaskItem />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TaskList;
