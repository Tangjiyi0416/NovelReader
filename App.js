import "react-native-gesture-handler";
import * as React from "react";
import {
  Text,
  Button,
  NativeBaseProvider,
  HStack,
  useColorMode,
  StatusBar,
} from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookImportScreen from "./src/screens/BookImportScreen";
import BookReaderScreen from "./src/screens/BookReaderScreen";
import { theme } from "./src/theme/theme";
import Drawer from "./src/navigation/Drawer";
import { Provider } from "react-redux";
import store from "./src/redux/store";
const StackNav = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <StatusBar />
          <StackNav.Navigator>
            <StackNav.Screen
              name="Main"
              component={Drawer}
              options={{ headerShown: false }}
            />
            <StackNav.Screen
              name="BookImport"
              component={BookImportScreen}
              options={{ animation: "fade_from_bottom", headerShown: false }}
            />
            <StackNav.Screen
              name="BookReader"
              component={BookReaderScreen}
              options={{ headerShown: false, animation: "fade_from_bottom" }}
            />
          </StackNav.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
