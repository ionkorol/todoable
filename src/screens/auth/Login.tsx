import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import { errorHandler, logIn } from "lib/user";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  Alert,
} from "native-base";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),
  password: yup.string().required(),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nav = useNavigation();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await logIn(values.email, values.password);
      } catch (error) {
        console.log(error);
        setError(errorHandler(error.code));
      }
      setLoading(false);
    },
  });

  console.log(formik.values);

  return (
    <Layout>
      <Box m={5}>
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign in to continue!
        </Heading>
        {error && (
          <Alert status="error" mt={10}>
            <Alert.Icon />
            <Alert.Title flexShrink={1}>{error}</Alert.Title>
          </Alert>
        )}

        <VStack space={10} mt={10}>
          <FormControl isInvalid={!!formik.errors.email}>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
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
              type="password"
              value={formik.values.password}
              onChange={(e) =>
                formik.setFieldValue("password", e.nativeEvent.text)
              }
            />
            <FormControl.ErrorMessage>
              {formik.errors.password}
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "700",
                color: "primary.500",
              }}
              alignSelf="flex-end"
              mt={1}
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button isLoading={loading} onPress={() => formik.handleSubmit()}>
            Login
          </Button>

          <HStack justifyContent="center">
            <Text fontSize="sm" color="muted.400" fontWeight={400}>
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{ color: "primary.500", bold: true, fontSize: "sm" }}
              onPress={() => nav.navigate("signup")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Login;
