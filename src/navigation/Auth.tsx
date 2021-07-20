import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen, SignupScreen } from "screens/auth";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
