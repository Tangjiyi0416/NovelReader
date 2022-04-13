import {
  Text,
  Box,
  Button,
  Icon,
  useColorModeValue,
  useColorMode,
  HStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as DocumentPicker from "expo-document-picker";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const TabNav = createBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import BookShelfScreen from "../screens/BookShlefScreen";

import React from "react";
import TransButton from "../components/TransButton";
const BookImportButton = ({ children, onPress }) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      onPress={onPress}
      top={-11}
      alignItems="center"
      justifyContent="center"
      width={50}
      height={50}
      borderRadius={25}
      colorScheme={colorMode === "light" ? "primary" : "darkPrimary"}
    >
      {children}
    </Button>
  );
};
const BookImportScreenWrapper = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();
      // Do something manually
      // ...
      DocumentPicker.getDocumentAsync({ type: "text/plain" })
        .then((result) => {
          if (result.type == "success")
            navigation.navigate("BookImport", { documentResult: result });
        })
        .catch((reason) => {
          console.warn(reason);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return null;
};

export default function TabBar({ navigation }) {
  const tabBTNColor = useColorModeValue("myColors.light60", "myColors.dark60");
  const tabBTNColorFocused = useColorModeValue(
    "myColors.light30",
    "myColors.dark30"
  );
  const tabBTNTextColor = useColorModeValue(
    "myColors.lightText",
    "myColors.darkText"
  );
  const { colorMode } = useColorMode();
  const leftButton = () => (
    <TransButton
      size={8}
      name="menu"
      onPress={navigation.openDrawer}
      marginLeft={2}
    />
  );
  const rightButton = () => (
    <HStack space={2} marginRight={2}>
      <TransButton size={8} name="magnify" />
      <TransButton size={8} name="dots-vertical" />
    </HStack>
  );
  return (
    <TabNav.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          borderTopColor: "transparent",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 50,
          backgroundColor: colorMode === "light" ? "#FEFEF8" : "#424E52",
        },
        headerShadowVisible: false,
        headerTitleStyle: { display: "none" },
        headerStyle: {
          backgroundColor: colorMode === "light" ? "#E8E5D9" : "#222629",
        },
        headerLeft: leftButton,
        headerRight: rightButton,
      }}
    >
      <TabNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box
              backgroundColor={focused ? tabBTNColor : tabBTNColorFocused}
              width={44}
              height={44}
              alignItems="center"
              justifyContent="center"
              borderRadius={12}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="home"
                color={tabBTNTextColor}
                size={6}
              />
              <Text color={tabBTNTextColor}>主頁</Text>
            </Box>
          ),
        }}
      />
      <TabNav.Screen
        name="Import"
        component={BookImportScreenWrapper}
        options={{
          headerShown: false,
          lazy: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              as={MaterialCommunityIcons}
              name="book-plus"
              color={tabBTNColorFocused}
              size={8}
            />
          ),
          tabBarButton: (props) => <BookImportButton {...props} />,
        }}
      />
      <TabNav.Screen
        name="BookShelf"
        component={BookShelfScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box
              backgroundColor={focused ? tabBTNColor : tabBTNColorFocused}
              width={44}
              height={44}
              alignItems="center"
              justifyContent="center"
              borderRadius={12}
            >
              <Icon
                as={MaterialCommunityIcons}
                name="bookshelf"
                color={tabBTNTextColor}
                size="6"
              />
              <Text color={tabBTNTextColor}>書架</Text>
            </Box>
          ),
        }}
      />
    </TabNav.Navigator>
  );
}
