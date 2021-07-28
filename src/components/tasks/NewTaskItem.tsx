import { Feather } from "@expo/vector-icons";
import { useFormik } from "formik";
import { createTask } from "lib/task";
import { HStack, Input, IconButton, Icon } from "native-base";
import React, { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Required"),
});

const NewTaskItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await createTask(values as any);
        formik.resetForm()
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    },
  });
  return (
    <HStack space={2} px={2}>
      <Input
        size="sm"
        placeholder="New Task"
        flex={1}
        InputLeftElement={<Icon size="sm" color="muted.400" as={<Feather name="square" />} />}
        value={formik.values.name}
        onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
      />
      <IconButton
        onPress={() => formik.handleSubmit()}
        isLoading={loading}
        icon={
          <Icon
            size="sm"
            color="success.500"
            as={<Feather name="arrow-up-circle" />}
          />
        }
      />
    </HStack>
  );
};

export default NewTaskItem;
