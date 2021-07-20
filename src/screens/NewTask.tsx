import { useNavigation } from "@react-navigation/core";
import { Layout } from "components/common";
import { createTask } from "lib/task";
import { Alert, Button, FormControl, Input, VStack } from "native-base";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const schema = yup.object().shape({
  name: yup.string().required("Task name is required!"),
  description: yup.string(),
});

interface Props {}

const NewTask: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nav = useNavigation();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await createTask({ ...values } as any);
      if (res) {
        nav.navigate("List");
      } else {
        setError("Unable to create task!");
      }
      setLoading(false);
    },
  });

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
          <Input
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.nativeEvent.text)
            }
          />
        </FormControl>
        <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
          Create Task
        </Button>
      </VStack>
    </Layout>
  );
};

export default NewTask;
