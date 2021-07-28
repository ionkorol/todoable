import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  HomeScreen,
  ListScreen,
  NewListScreen,
  NewTaskScreen,
  TaskScreen,
  UpdateListScreen,
} from "screens";
import { AccountScreen } from "screens/settings";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewList"
        component={NewListScreen}
        options={{ headerTitle: "New List" }}
      />
      <Stack.Screen
        name="UpdateList"
        component={UpdateListScreen}
        options={{ headerTitle: "Update List" }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ headerTitle: "List" }}
      />
      <Stack.Screen
        name="NewTask"
        component={NewTaskScreen}
        options={{ headerTitle: "New Task" }}
      />
      <Stack.Screen
        name="Task"
        component={TaskScreen}
        options={{ headerTitle: "Task" }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerTitle: "My Account" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
