import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EmailSignin, EmailSignup } from "screens/auth/Email";

const Stack = createStackNavigator();

const EmailAuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="EmailSignin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="EmailSignin" component={EmailSignin} />
      <Stack.Screen name="EmailSignup" component={EmailSignup} />
    </Stack.Navigator>
  );
};

export default EmailAuthNavigation;
