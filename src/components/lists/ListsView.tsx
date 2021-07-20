import { Flex, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import { ListProp } from "utils/interfaces";
import { ListItem } from ".";
import NewListItem from "./NewListItem";
import { getLists } from "lib/list";
import firebase from "firebase";

interface Props {}

const ListsView: React.FC<Props> = (props) => {
  const [data, setData] = useState<ListProp[]>([]);

  // const handleGetLists = async () => {
  //   const res = await getLists();
  //   if (res) {
  //     setData(res);
  //   } else {
  //     console.log("Error Lists");
  //   }
  // };

  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("groups")
      .doc(user?.selectedGroup)
      .collection("lists")
      .onSnapshot(async (query) => {
        let listData: any[] = [];
        for (const docSnap of query.docs) {
          const docData = docSnap.data();
          const taskQuery = await docSnap.ref.collection("tasks").get();

          const tasksData = taskQuery.docs.map((snap) => snap.data());
          listData = [...listData, { ...docData, tasks: tasksData }];
        }
        setData(listData);
      });
    return () => unsub();
  }, [user?.selectedGroup]);

  return (
    <ScrollView>
      <Flex direction="row" wrap="wrap">
        {data.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
        <NewListItem />
      </Flex>
    </ScrollView>
  );
};
export default ListsView;
