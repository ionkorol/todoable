import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import { createList } from "lib/list";
import {
  Heading,
  VStack,
  FormControl,
  Input,
  HStack,
  Link,
  Button,
} from "native-base";
import React, { useState } from "react";

interface Props {}

const NewList: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await createList({ name } as any);
    setLoading(false);
    if (res) {
      nav.goBack();
    } else {
      console.log("Error");
    }
  };

  return (
    <Layout>
      <VStack space={10} mt={5} mx={5}>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Name
          </FormControl.Label>
          <Input value={name} onChange={(e) => setName(e.nativeEvent.text)} />
        </FormControl>

        <Button
          isLoading={loading}
          isLoadingText="Creating..."
          onPress={handleSubmit}
        >
          Create List
        </Button>
      </VStack>
    </Layout>
  );
};

export default NewList;
