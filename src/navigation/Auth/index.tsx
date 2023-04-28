import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EmailAuthNavigation from "./Email";
import PhoneAuthNavigation from "./Phone";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="EmailAuth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PhoneAuth" component={PhoneAuthNavigation} />
      <Stack.Screen name="EmailAuth" component={EmailAuthNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
