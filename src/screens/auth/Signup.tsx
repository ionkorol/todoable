import { useNavigation } from "@react-navigation/native";
import { Layout } from "components/common";
import {
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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as userActions from "redux-store/actions/userActions";
import { RootState } from "redux-store/store";

interface Props {
  userSignup: typeof userActions.userSignup;
  loading: boolean;
}

const Signup: React.FC<Props> = (props) => {
  const { userSignup, loading } = props;

  const nav = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    console.log(name, email, password, confirmPassword);
  }, [name, email, password, confirmPassword]);
  return (
    <Layout>
      <Box m={5}>
      <Heading size="lg" color="primary.500">
        Welcome
      </Heading>
      <Heading color="muted.400" size="xs">
        Sign up to continue!
      </Heading>

      <VStack space={5} mt={10}>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Name
          </FormControl.Label>
          <Input value={name} onChange={(e) => setName(e.nativeEvent.text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Email
          </FormControl.Label>
          <Input value={email} onChange={(e) => setEmail(e.nativeEvent.text)} />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Password
          </FormControl.Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{ color: "muted.500", fontSize: "sm", bold: true }}
          >
            Confirm Password
          </FormControl.Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
          />
        </FormControl>
        <Button
          my={5}
          isLoading={loading}
          isLoadingText="Signing Up"
          onPress={() => userSignup(name, email, password)}
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

const mapState = (state: RootState) => ({
  loading: state.user.loading,
});

const mapDispatch = {
  userSignup: userActions.userSignup as any,
};

export default connect(mapState, mapDispatch)(Signup);
