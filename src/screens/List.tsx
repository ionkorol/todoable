import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "components/common/Layout";
import { TaskList } from "components/tasks";
import { Fab, Icon } from "native-base";
import React from "react";

interface Props {}

const List: React.FC<Props> = (props) => {
  const nav = useNavigation();
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};

export default List;
