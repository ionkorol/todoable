import { Feather } from "@expo/vector-icons";
import { AppBar, Layout } from "components/common";
import { useFormik } from "formik";
import { createFeedback } from "lib/feedback";
import {
  Alert,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Radio,
  TextArea,
  VStack,
} from "native-base";
import React, { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Please enter your email!"),
  type: yup.string().required("Please select feedback type!"),
  description: yup.string().required("Please add some feedback!"),
});

const Feedback = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: "",
      type: "",
      description: "",
    },
    onSubmit: async (values, helpers) => {
      setLoading(true);
      try {
        await createFeedback(values);
        helpers.resetForm();
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    },
  });
  return (
    <Layout>
      <VStack space={10} p={5}>
        {error && (
          <Alert status="error">
            <Alert.Icon />
            <Alert.Title>{error}</Alert.Title>
          </Alert>
        )}
        <FormControl isInvalid={!!formik.errors.email}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.nativeEvent.text)}
            placeholder="Enter your email"
          />
          <FormControl.ErrorMessage>
            {formik.errors.email}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.errors.type}>
          <FormControl.Label>Type</FormControl.Label>
          <Radio.Group
            name="feedbackType"
            onChange={(value) => formik.setFieldValue("type", value)}
            accessibilityLabel="Feedback Type"
          >
            <HStack space={5}>
              <Radio accessibilityLabel="Feedback Type Comment" value="comment">
                Comment
              </Radio>
              <Radio accessibilityLabel="Feedback Type Bug" value="bug">
                Bug
              </Radio>
              <Radio accessibilityLabel="Feedback Type Other" value="other">
                Other
              </Radio>
            </HStack>
          </Radio.Group>
          <FormControl.ErrorMessage>
            {formik.errors.type}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.errors.description}>
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.nativeEvent.text)
            }
            placeholder="Enter your description"
          />
          <FormControl.ErrorMessage>
            {formik.errors.description}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          onPress={() => formik.handleSubmit()}
          endIcon={<Icon as={Feather} name="send" size="sm" />}
          isLoading={loading}
        >
          Send
        </Button>
      </VStack>
    </Layout>
  );
};

export default Feedback;
