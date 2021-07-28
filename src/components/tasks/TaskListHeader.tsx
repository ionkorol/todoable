import { Feather } from "@expo/vector-icons";
import { VStack, HStack, Input, Icon, IconButton, Divider } from "native-base";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  handleSearch: (terms: string) => void;
  showComplete: boolean;
  setShowComplete: Dispatch<SetStateAction<boolean>>;
}

const TaskListHeader: React.FC<Props> = (props) => {
  const { handleSearch, showComplete, setShowComplete } = props;

  const [search, setSearch] = useState("");
  return (
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
          onChange={(e) => {
            handleSearch(e.nativeEvent.text);
            setSearch(e.nativeEvent.text);
          }}
        />
        <IconButton
          icon={
            <Icon
              size="sm"
              as={<Feather name={showComplete ? "square" : "check-square"} />}
            />
          }
          onPress={() => setShowComplete((prevState) => !prevState)}
        />
      </HStack>
      <Divider />
    </VStack>
  );
};

export default TaskListHeader;
