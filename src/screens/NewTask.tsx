import { useNavigation } from "@react-navigation/core";
import { Layout } from "components/common";
import { createTask } from "lib/task";
import { Button, FormControl, Input, VStack } from "native-base";
import React, { useState } from "react";

interface Props {}

const NewTask: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nav = useNavigation();

  const handleSubmit = async () => {
    const res = await createTask({ name, description } as any);
    if (res) {
      nav.navigate("List");
    } else {
      alert("Error");
    }
  };

  return (
    <Layout>
      <VStack space={5} m={5}>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input value={name} onChange={(e) => setName(e.nativeEvent.text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Description</FormControl.Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.nativeEvent.text)}
          />
        </FormControl>
        <Button onPress={handleSubmit}>Create Task</Button>
      </VStack>
    </Layout>
  );
};

export default NewTask;
