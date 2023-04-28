import { Feather } from "@expo/vector-icons";
import { useFormik } from "formik";
import { useAppSelector } from "hooks/redux";
import { createTask } from "lib/tasksApi";
import { HStack, Input, IconButton, Icon } from "native-base";
import React from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Required"),
});

const NewTaskItem = () => {
  const { loading } = useAppSelector((state) => state.tasks);
  const { list } = useAppSelector((state) => state.lists);
  const { group } = useAppSelector((state) => state.groups);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      await createTask({
        id: "",
        name: values.name,
        createdAt: Date.now(),
        description: "",
        status: "active",
        list: list!,
        group: group!,
      });
      helpers.resetForm();
    },
  });
  return (
    <HStack
      p={1}
      m={1}
      borderRadius={10}
      space={2}
      backgroundColor="primary.50"
    >
      <Input
        placeholder="New task"
        flex={1}
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
      />
      <IconButton
        onPress={() => formik.handleSubmit()}
        isLoading={loading.creating}
        icon={<Icon as={Feather} name="arrow-up-circle" />}
      />
    </HStack>
  );
};

export default NewTaskItem;
