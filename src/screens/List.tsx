import { Alert, Box, Heading, Icon, useTheme } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "components/common";
import { TaskItem, NewTaskItem } from "components/list";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import * as tasksActions from "redux-store/slices/tasks";
import * as listsActions from "redux-store/slices/lists";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { OptionMenu } from "components/ui";
import firebase from "firebase";

interface Props {}

const List: React.FC<Props> = (props) => {
  const { loading, tasks, error, filters } = useAppSelector(
    (state) => state.tasks
  );
  const { list } = useAppSelector((state) => state.lists);
  const listData = useAppSelector((state) =>
    state.lists.lists.find((item) => item.id === list)
  );
  const [data, setData] = useState(tasks);

  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      if (!tasks) {
        dispatch(tasksActions.readTasks(null));
      }

      const unsubGroups = firebase
        .firestore()
        .collection("tasks")
        .where("list", "==", list)
        .onSnapshot((query) => {
          dispatch(tasksActions.update(query.docs.map((doc) => doc.data())));
        });

      return () => {
        unsubGroups();
      };
    }, [])
  );

  useEffect(() => {
    nav.setOptions({
      title: listData?.name,
      headerRight: () => (
        <OptionMenu
          menu={[
            {
              title: "Edit List",
              onPress: () =>
                nav.navigate("ListAction", { id: listData && listData.id }),
              icon: <Icon as={Feather} name="edit-2" size="sm" />,
            },
            {
              title: filters.showComplete ? "Hide Completed" : "Show Completed",
              onPress: () =>
                dispatch(tasksActions.showComplete(!filters.showComplete)),
              icon: filters.showComplete ? (
                <Icon as={Feather} name="eye-off" size="sm" />
              ) : (
                <Icon as={Feather} name="eye" size="sm" />
              ),
            },
            {
              title: "Delete List",
              onPress: () => dispatch(listsActions.deleteList(null)),
              icon: (
                <Icon as={Feather} name="trash" color="error.500" size="sm" />
              ),
              color: "error.500",
            },
          ]}
        />
      ),
      headerStyle: {
        shadowOffset: {
          width: 0,
          height: 0,
        },
        height: 100,
        backgroundColor: theme.colors[listData?.color!][50],
      },
    });
  }, [filters, listData]);

  useEffect(() => {
    if (filters.showComplete) {
      setData(tasks);
    } else {
      setData(tasks.filter((item) => item.status !== "complete"));
    }
    Object.keys(theme).forEach((key) => console.log(key));
  }, [filters, tasks]);

  return (
    <Layout>
      <Box flex={1} px={3} backgroundColor={`${listData?.color}.50`}>
        {error && (
          <Alert>
            <Alert.Icon />
            <Alert.Title>{error.message}</Alert.Title>
          </Alert>
        )}
        <KeyboardAwareFlatList
          contentContainerStyle={{
            flex: 1,
          }}
          data={data}
          renderItem={({ item }) => <TaskItem item={item} />}
          ListEmptyComponent={
            <Box p={3} m={1} backgroundColor="primary.50" borderRadius={10}>
              <Heading size="md" color="error.500">
                No tasks
              </Heading>
            </Box>
          }
          ListFooterComponent={<NewTaskItem />}
          keyExtractor={(item) => item.id}
          refreshing={loading.reading}
          onRefresh={() => dispatch(tasksActions.readTasks(null))}
        />
      </Box>
    </Layout>
  );
};

export default List;
