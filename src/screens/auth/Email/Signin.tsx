import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  VStack,
  Alert,
  Icon,
} from "native-base";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Feather } from "@expo/vector-icons";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long!")
    .required("Password is required!"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match!"),
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
      console.log(values);
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
          <Button
            startIcon={<Icon as={Feather} name="log-in" />}
            isLoading={loading}
            onPress={() => formik.handleSubmit()}
          >
            Login / Register
          </Button>
          <Button
            startIcon={<Icon as={Feather} name="phone" />}
            colorScheme="success"
            onPress={() => nav.navigate("PhoneAuth")}
          >
            Phone Login
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Login;
