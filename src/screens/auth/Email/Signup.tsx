import { Layout } from "components/common";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Heading,
  Icon,
  Input,
  VStack,
} from "native-base";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "redux-store/slices/user";
import { RootState } from "redux-store/store";

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
});

interface Props {}

const Signup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      dispatch(createUser(values));
    },
  });
  return (
    <Layout>
      <VStack space={20} p={5} justifyContent="center">
        <Box>
          <Heading size="lg" color="primary.500">
            Welcome to Our ToDo app!
          </Heading>
          <Heading color="muted.400" size="xs">
            What is your name ?
          </Heading>
        </Box>

        {error && (
          <Alert status="error" mt={10}>
            <Alert.Icon />
            <Alert.Title flexShrink={1}>{error.message}</Alert.Title>
          </Alert>
        )}
        <FormControl isInvalid={!!formik.errors.name}>
          <FormControl.Label>My name is:</FormControl.Label>
          <Input
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
          />
          <FormControl.ErrorMessage>
            {formik.errors.name}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          my={5}
          isLoading={loading.creating}
          onPress={() => formik.handleSubmit()}
          startIcon={<Icon as={Feather} name="user-plus" />}
        >
          Create Profile
        </Button>
      </VStack>
    </Layout>
  );
};

export default Signup;
