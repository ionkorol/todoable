import { useNavigation } from "@react-navigation/core";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Layout } from "components/common";
import { ProgressList } from "components/task";
import { useFormik } from "formik";
import { getTask, updateTask } from "lib/task";
import {
  VStack,
  FormControl,
  Input,
  Alert,
  Button,
  Center,
  Spinner,
  TextArea,
  ScrollView,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TaskProp } from "utils/interfaces";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Task name is required!"),
  description: yup.string(),
});

const Task = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TaskProp | null>(null);
  const route = useRoute();
  const taskId = (route.params as any).taskId;

  const nav = useNavigation();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: data ? data.name : "",
      description: data ? data.description : "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await updateTask(taskId, values as any);
      if (res) {
        nav.navigate("List");
      } else {
        setError("Unable to update task!");
      }
      setLoading(false);
    },
    enableReinitialize: true,
  });

  useFocusEffect(
    useCallback(() => {
      (async () => setData(await getTask(taskId)))();
    }, [])
  );

  if (!data) {
    return (
      <Layout>
        <Center>
          <Spinner />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <VStack space={10} m={5}>
        {error && (
          <Alert status="error">
            <Alert.Icon />
            <Alert.Title flexShrink={1}>{error}</Alert.Title>
          </Alert>
        )}
        <FormControl isInvalid={!!formik.errors.name}>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
          />
          <FormControl.ErrorMessage>
            {formik.errors.name}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.errors.description}>
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.nativeEvent.text)
            }
          />
        </FormControl>
        <ProgressList taskId={data.id} />
        <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
          Update Task
        </Button>
      </VStack>
    </Layout>
  );
};

export default Task;
