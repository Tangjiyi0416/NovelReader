import "react-native-gesture-handler";
import * as React from "react";
import { Text, Box, NativeBaseProvider, Stack, Icon } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookImportScreen from "./src/screens/BookImportScreen";
import BookReaderScreen from "./src/screens/BookReaderScreen";
import { theme } from "./src/theme/theme";
import Drawer from "./src/navigation/Drawer";

const StackNav = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <StackNav.Navigator>
          <StackNav.Screen
            name="Main"
            component={Drawer}
            options={{ headerShown: false }}
          />
          <StackNav.Screen name="BookImport" component={BookImportScreen} />
          <StackNav.Screen
            name="BookReader"
            component={BookReaderScreen}
            options={{ headerShown: false }}
          />
        </StackNav.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
