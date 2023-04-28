import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useFocusEffect } from "@react-navigation/native";
import { AppBar, Layout } from "components/common";
import { OptionMenu } from "components/ui";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  VStack,
  FormControl,
  Input,
  Alert,
  Button,
  Center,
  Spinner,
  TextArea,
  Icon,
} from "native-base";
import React, { useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { updateTask, deleteTask } from "redux-store/slices/tasks";
import { color } from "styled-system";

import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Task name is required!"),
  description: yup.string(),
});

const Task = () => {
  const { loading, error, task } = useAppSelector((state) => state.tasks);
  const data = useAppSelector((state) =>
    state.tasks.tasks.find((item) => item.id === task)
  );
  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: data ? data.name : "",
      description: data ? data.description : "",
    },
    onSubmit: async (values) => {
      dispatch(updateTask({ ...data!, ...values }));
      nav.navigate("List");
    },
    enableReinitialize: true,
  });

  useFocusEffect(
    useCallback(() => {
      nav.setOptions({
        headerRight: () => (
          <OptionMenu
            menu={[
              {
                title: "View Progress",
                onPress: () => nav.navigate("Progress"),
                icon: <Icon as={Feather} name="activity" color="primary.500" />,
              },
              {
                title: "Delete Task",
                onPress: () => dispatch(deleteTask(null)).then(nav.goBack),
                icon: <Icon as={Feather} name="trash" color="error.500" />,
                color: "error.500",
              },
            ]}
          />
        ),
      });
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
      <KeyboardAwareScrollView>
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

          <Button
            isLoading={loading.updating}
            onPress={() => formik.handleSubmit()}
          >
            Update Task
          </Button>
        </VStack>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default Task;
