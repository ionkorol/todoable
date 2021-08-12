import { Layout } from "components/common";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "native-base";
import React, { useRef, useState } from "react";
import * as yup from "yup";

import firebase from "firebase";
import { Feather } from "@expo/vector-icons";
import { phoneAuth } from "lib/user";
import { useNavigation } from "@react-navigation/native";
import { formatPhoneNumber } from "lib";
import { readUser } from "lib/userApi";

const schema = yup.object().shape({
  number: yup.string().required("Please enter your phone number!"),
  code: yup.string().required("Please enter code!"),
  verificationId: yup.string().required(),
});

const PhoneLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCodeSend, setLoadingCodeSend] = useState(false);
  const [delayCodeSend, setDelayCodeSend] = useState(0);
  const [errorCodeSend, setErrorCodeSend] = useState(0);

  const recaptchaRef = useRef(null);
  const nav = useNavigation();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      number: "",
      code: "",
      verificationId: "",
    },
    onSubmit: async (values, helpers) => {
      console.log(values);
      setLoading(true);
      try {
        const creds = await phoneAuth.login(values.verificationId, values.code);
        console.log(creds.additionalUserInfo?.isNewUser);
        const data = await readUser(creds.user?.uid!);
        if (creds.additionalUserInfo?.isNewUser || !data) {
          nav.navigate("Signup");
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    },
  });

  return (
    <Layout>
      <VStack space={10} p={5}>
        <Box>
          <Heading size="lg" color="primary.500">
            Welcome
          </Heading>
          <Heading color="muted.400" size="xs">
            Sign in to continue!
          </Heading>
        </Box>
        {error && (
          <Alert status="error">
            <Alert.Icon />
            <Alert.Title flexShrink={1}>{error}</Alert.Title>
          </Alert>
        )}
        <FormControl isInvalid={!!formik.errors.number}>
          <FormControl.Label>Phone Number</FormControl.Label>
          <HStack space={2}>
            <Input
              value={formik.values.number}
              onChange={(e) =>
                formik.setFieldValue(
                  "number",
                  formatPhoneNumber(e.nativeEvent.text, formik.values.number)
                )
              }
              InputLeftElement={<Text ml={3}>+1</Text>}
              placeholder="Enter your number"
              keyboardType="numeric"
              flex={1}
            />
            <Button
              isLoading={loadingCodeSend}
              size="xs"
              startIcon={<Icon as={Feather} name="mail" size="xs" />}
              onPress={async () => {
                setLoadingCodeSend(true);
                try {
                  const data = await phoneAuth.sendPhoneVerification(
                    `+1 ${formik.values.number}`,
                    recaptchaRef.current
                  );
                  formik.setFieldValue("verificationId", data);
                } catch (error) {
                  setErrorCodeSend(error.message);
                }
                setLoadingCodeSend(false);
              }}
            >
              Get Code
            </Button>
          </HStack>
          <FormControl.ErrorMessage>
            {formik.errors.number}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.errors.code}>
          <FormControl.Label>Verification Code</FormControl.Label>
          <Input
            value={formik.values.code}
            onChange={(e) => formik.setFieldValue("code", e.nativeEvent.text)}
            placeholder="Enter your code"
            keyboardType="numeric"
          />
          <FormControl.ErrorMessage>
            {formik.errors.code}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          isLoading={loading}
          startIcon={<Icon as={Feather} name="log-in" size="sm" />}
          onPress={() => {
            formik.handleSubmit();
            console.log(formik.values);
          }}
        >
          Log In
        </Button>
      </VStack>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaRef}
        firebaseConfig={firebase.app().options}
        attemptInvisibleVerification
      />
    </Layout>
  );
};

export default PhoneLogin;
