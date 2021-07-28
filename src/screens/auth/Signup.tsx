import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import signUp from "lib/user/signUp";
import { errorHandler } from "lib/user";

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

interface Props {}

const Signup: React.FC<Props> = (props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        signUp(values.name, values.email, values.password);
      } catch (error) {
        setError(errorHandler(error.code));
      }
      setLoading(false);
    },
  });
  return (
    <Layout>
      <Box m={5}>
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign up to continue!
        </Heading>

        {error && (
          <Alert status="error" mt={10}>
            <Alert.Icon />
            <Alert.Title flexShrink={1}>{error}</Alert.Title>
          </Alert>
        )}

        <VStack space={5} mt={10}>
          <FormControl isInvalid={!!formik.errors.name}>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.nativeEvent.text)}
            />
            <FormControl.ErrorMessage>
              {formik.errors.name}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={(e) =>
                formik.setFieldValue("email", e.nativeEvent.text)
              }
            />
            <FormControl.ErrorMessage>
              {formik.errors.email}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.password}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={formik.values.password}
              onChange={(e) =>
                formik.setFieldValue("password", e.nativeEvent.text)
              }
            />
            <FormControl.ErrorMessage>
              {formik.errors.password}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!formik.errors.confirmPassword}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              placeholder="Enter your password once again"
              type="password"
              value={formik.values.confirmPassword}
              onChange={(e) =>
                formik.setFieldValue("confirmPassword", e.nativeEvent.text)
              }
            />
            <FormControl.ErrorMessage>
              {formik.errors.confirmPassword}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            my={5}
            isLoading={loading}
            onPress={() => formik.handleSubmit()}
          >
            Sign Up
          </Button>

          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.400" fontWeight={400}>
              Already have an account?{" "}
            </Text>
            <Link
              _text={{ color: "primary.500", bold: true, fontSize: "sm" }}
              onPress={() => nav.navigate("login")}
            >
              Log In
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Signup;
