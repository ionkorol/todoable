import { Box, FlatList, Heading } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux-store/store";
import ListItem from "./ListItem";
import NewListItem from "./NewListItem";
import * as listActions from "redux-store/slices/lists";

interface Props {}

const ListsView: React.FC<Props> = (props) => {
  const { lists } = useSelector((state: RootState) => state.lists);
  const dispatch = useDispatch();

  return (
    <FlatList
      flexGrow={1}
      data={lists}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<Box></Box>}
      ListHeaderComponent={<Heading>Lists</Heading>}
      ListFooterComponent={<NewListItem />}
      onRefresh={() => dispatch(listActions.readLists(null))}
      refreshing={false}
      contentInset={{ bottom: 50 }}
    />
  );
};
export default ListsView;
