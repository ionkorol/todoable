import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import firebase from "firebase";
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
} from "native-base";
import React, { useState } from "react";

const Login = () => {
  const nav = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Layout>
      <Box m={5}>
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={10} mt={10}>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.500", fontSize: "sm", fontWeight: 600 }}
            >
              Email ID
            </FormControl.Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.500", fontSize: "sm", fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
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
            onPress={() =>
              firebase.auth().signInWithEmailAndPassword(email, password)
            }
          >
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
