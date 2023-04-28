import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  // PhoneNumberScreen,
  // SecurityCodeScreen,
  PhoneSignupScreen,
} from "screens/auth/Phone";

const Stack = createStackNavigator();

const PhoneAuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="PhoneNumber"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} /> */}
      {/* <Stack.Screen name="SecurityCode" component={SecurityCodeScreen} /> */}
      <Stack.Screen name="PhoneSignup" component={PhoneSignupScreen} />
    </Stack.Navigator>
  );
};

export default PhoneAuthNavigation;
