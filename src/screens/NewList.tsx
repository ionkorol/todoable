import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import { createList } from "lib/list";
import { VStack, FormControl, Input, Button, Alert } from "native-base";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const schema = yup.object().shape({
  name: yup.string().required("List name is required!"),
});

interface Props {}

const NewList: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nav = useNavigation();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const res = await createList({ ...values } as any);
      setLoading(false);
      if (res) {
        nav.goBack();
      } else {
        setError("Unable to create list!");
      }
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
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Name
          </FormControl.Label>
          <Input
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
          />
          <FormControl.ErrorMessage>
            {formik.errors.name}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
          Create List
        </Button>
      </VStack>
    </Layout>
  );
};

export default NewList;
