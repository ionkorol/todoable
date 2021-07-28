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
import React, { useEffect, useState } from "react";
import { TaskProp } from "utils/interfaces";
import TaskItem from "./TaskItem";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

interface Props {}

const TaskList: React.FC<Props> = (props) => {
  const [rawData, setRawData] = useState<TaskProp[]>([]);
  const [cleanData, setCleanData] = useState<TaskProp[]>([]);
  const [search, setSearch] = useState("");
  const [showComplete, setShowComplete] = useState(false);

  const nav = useNavigation();

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
      .onSnapshot(async (query) => {
        const docsData = query.docs.map((snap) => snap.data());
        setRawData(docsData as TaskProp[]);
      });

    return () => unsub();
  }, []);

  const handleSearch = (terms: string) => {
    setCleanData(rawData.filter((item) => item.name.includes(terms)));
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
        <VStack>
          <HStack p={2} space={3}>
            <Input
              placeholder="Search"
              flex={1}
              p={2}
              InputLeftElement={
                <Icon
                  size="sm"
                  ml={2}
                  color="gray.400"
                  as={<Feather name="search" />}
                />
              }
              value={search}
              onChange={(e) => handleSearch(e.nativeEvent.text)}
            />
            <IconButton
              icon={
                <Icon
                  size="sm"
                  as={
                    <Feather name={showComplete ? "square" : "check-square"} />
                  }
                />
              }
              onPress={() => setShowComplete((prevState) => !prevState)}
            />
          </HStack>
          <Divider />
        </VStack>
      }
      ListFooterComponent={
        <React.Fragment>
          <Divider />
          <Pressable
            onPress={() => nav.navigate("NewTask")}
            flexDirection="row"
            alignItems="center"
            p={5}
          >
            <Icon as={<Feather name="plus" />} mr={5} />
            <Text>New Task</Text>
          </Pressable>
        </React.Fragment>
      }
      keyExtractor={(item) => item.id}
    />
  );
};

export default TaskList;
