import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  Pressable,
  Icon,
  FlatList,
  Divider,
} from "native-base";
import React, { useEffect, useState } from "react";
import { TaskProp } from "utils/interfaces";
import TaskItem from "./TaskItem";
import { useNavigation } from "@react-navigation/native";
import getTasks from "lib/task/getTasks";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";

interface Props {}

const TaskList: React.FC<Props> = (props) => {
  const [data, setData] = useState<TaskProp[]>([]);

  const nav = useNavigation();

  const handleGetTasks = async () => {
    const res = await getTasks();
    if (res) {
      setData(res);
    } else {
      console.log("Error tasks");
    }
  };
  console.log(data);
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
      .where("archived", "==", false)
      .onSnapshot(async (query) => {
        const docsData = query.docs.map((snap) => snap.data());
        setData(docsData as TaskProp[]);
      });

    return () => unsub();
  }, []);

  return (
    <ScrollView flex={1}>
      <FlatList
        data={data}
        renderItem={TaskItem}
        ItemSeparatorComponent={Divider}
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
      />
    </ScrollView>
  );
};

export default TaskList;
