import { useColorMode } from "native-base";
import React from "react";

import TabBar from "./TabBar";

import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import HeaderButton from "../components/HeaderButton";
const DrawerNav = createDrawerNavigator();
const Empty = () => null;

export default function Drawer({ navigation }) {
  const { colorMode } = useColorMode();
  const backButton = () => (
    <HeaderButton
      name="arrow-left"
      onPress={navigation.goBack}
      marginLeft="8px"
    />
  );
  return (
    <DrawerNav.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colorMode === "light" ? "#E8E5D9" : "#222629",
        },
        headerLeft: backButton,
      }}
    >
      <DrawerNav.Screen
        name="Tabs"
        component={TabBar}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <DrawerNav.Screen name="Setting" component={SettingsScreen} />
      <DrawerNav.Screen name="About" component={Empty} />
      <DrawerNav.Screen name="User Guide" component={Empty} />
    </DrawerNav.Navigator>
  );
}
