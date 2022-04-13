import {
  Box,
  Text,
  Image,
  useColorMode,
  useTheme,
  Divider,
  Icon,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import TabBar from "./TabBar";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import TransButton from "../components/TransButton";
const DrawerNav = createDrawerNavigator();
const Empty = ({ route }) => (
  <Box
    flex={1}
    justifyContent="center"
    alignItems="center"
    _light={{ bg: "myColors.light60" }}
    _dark={{ bg: "myColors.dark60" }}
  >
    <Text>{route.name}</Text>
  </Box>
);
const CustomDrawContent = (props) => {
  const { colors } = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <Image
        h={180}
        source={require("../../assets/patrick-tomasso-Oaqk7qqNh_c-unsplash.png")}
        alt="Drawer Image"
      />
      <Box pl={5} pt={6} pb={2}>
        <Text fontSize="2xl">看小說ㄉ</Text>
      </Box>
      <Divider
        my="2"
        _light={{
          bg: "muted.800",
        }}
        _dark={{
          bg: "muted.50",
        }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function Drawer({ navigation }) {
  const { colorMode } = useColorMode();
  const settingIcon = () => (
    <Icon ml={4} as={MaterialCommunityIcons} name="cog" size={7} />
  );
  const aboutIcon = () => (
    <Icon ml={4} as={MaterialCommunityIcons} name="information" size={7} />
  );
  const guideIcon = () => (
    <Icon
      ml={4}
      as={MaterialCommunityIcons}
      name="book-open-variant"
      size={7}
    />
  );
  const backButton = () => (
    <TransButton
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
        headerTintColor: colorMode === "light" ? "#131313" : "#FAF7EE",
        headerLeft: backButton,
        drawerStyle: {
          backgroundColor: colorMode === "light" ? "#E8E5D9" : "#222629",
        },
        drawerActiveBackgroundColor: "#CBCBCB59",
        drawerActiveTintColor: colorMode === "light" ? "#131313" : "#FAF7EE",
        drawerInactiveTintColor: colorMode === "light" ? "#131313" : "#FAF7EE",
        drawerLabelStyle: { fontSize: 17 },
      }}
      drawerContent={(props) => <CustomDrawContent {...props} />}
    >
      <DrawerNav.Screen
        name="Tabs"
        component={TabBar}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <DrawerNav.Screen
        name="Setting"
        component={SettingsScreen}
        options={{ title: "設定", drawerIcon: settingIcon }}
      />
      <DrawerNav.Screen
        name="About"
        component={Empty}
        options={{ title: "關於", drawerIcon: aboutIcon }}
      />
      <DrawerNav.Screen
        name="User Guide"
        component={Empty}
        options={{ title: "使用說明", drawerIcon: guideIcon }}
      />
    </DrawerNav.Navigator>
  );
}
