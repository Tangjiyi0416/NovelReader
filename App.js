import "react-native-gesture-handler";
import * as React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BookImportScreen from "./src/screens/BookImportScreen";
import BookReaderScreen from "./src/screens/BookReaderScreen";
import { theme } from "./src/theme/theme";
import Drawer from "./src/navigation/Drawer";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
const StackNav = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}
