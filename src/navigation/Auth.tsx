import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EmailAuthScreen, PhoneAuthScreen, SignupScreen } from "screens/auth";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="PhoneAuth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <Stack.Screen name="EmailAuth" component={EmailAuthScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
