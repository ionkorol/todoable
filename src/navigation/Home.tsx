import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Heading, Icon } from "native-base";
import React from "react";
import {
  HomeScreen,
  ListScreen,
  ProgressScreen,
  TaskScreen,
  ListActionScreen,
} from "screens";
import { AccountScreen, FeedbackScreen } from "screens/settings";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Icon
            as={Feather}
            name="chevron-left"
            color="primary.500"
            size="lg"
          />
        ),

        headerTitle: (props) => <Heading size="lg">{props.children}</Heading>,
        headerStyle: {
          shadowOffset: {
            width: 0,
            height: 0,
          },
          height: 100,
        },
        // ...TransitionPresets.ModalTransition,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ListAction" component={ListActionScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
