import { Box } from "native-base";
import React from "react";
import { SafeAreaView, StatusBar, View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "style";

const Layout = ({ children }: { children: any }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Box flex={1} w="100%" mx="auto" bgColor="white">
          <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
        </Box>
      </SafeAreaView>
    </View>
  );
};

export default Layout;
