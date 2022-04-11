import React from "react";
import { Box, Text } from "native-base";
import { createDrawerNavigator } from "@react-navigation/drawer";
const DrawerNav = createDrawerNavigator();
export default function BookShelfScreen() {
  return (
    <Box
      safeArea={true}
      flex={1}
      alignItems="center"
      justifyContent="center"
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Text>Bookshelf</Text>
    </Box>
  );
}
