import { Box } from "native-base";
import React from "react";
import {
  StatusBar,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native";

const Layout = ({ children }: { children: any }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} w="100%" mx="auto">
            {children}
          </Box>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default Layout;
