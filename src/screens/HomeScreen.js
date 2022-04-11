import React from "react";
import { Box, Button, IconButton, Text, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      safeArea={true}
      flex={1}
      alignItems="center"
      justifyContent="center"
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Button onPress={toggleColorMode}>mode</Button>
    </Box>
  );
}
