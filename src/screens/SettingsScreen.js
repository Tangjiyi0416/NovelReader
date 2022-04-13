import React from "react";
import { Box, Button, Text, useColorMode } from "native-base";

export default function SettingsScreen() {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Text>SettingsScreen</Text>
      <Button onPress={toggleColorMode}>Color Mode</Button>
    </Box>
  );
}
