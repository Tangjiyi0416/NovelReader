import React from "react";
import {
  Box,
  Button,
  Text,
  useColorMode,
  ScrollView,
  VStack,
} from "native-base";

export default function SettingsScreen() {
  const { toggleColorMode } = useColorMode();
  return (
    <Box
      flex={1}
      px={4}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <ScrollView
        flex={1}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VStack
          p={4}
          width={"98%"}
          my={5}
          borderRadius={6}
          shadow={3}
          _light={{ bgColor: "myColors.lightCard" }}
          _dark={{ bgColor: "myColors.darkCard" }}
        >
          <Button onPress={toggleColorMode}>
            <Text
              _light={{ color: "myColors.light30" }}
              _dark={{ color: "myColors.light30" }}
            >
              Color Mode
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}
