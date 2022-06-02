import React from "react";
import {
  Box,
  Button,
  Text,
  useColorMode,
  ScrollView,
  VStack,
} from "native-base";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { clearBookList } from "../redux/bookListSlice";

export default function SettingsScreen() {
  const { toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const ClearAllData = () => {
    const path = FileSystem.documentDirectory;
    FileSystem.deleteAsync(path + "books")
      .then(() => {
        console.warn("All data cleared.");
        dispatch(clearBookList());
      })
      .catch(() => {
        console.warn("No data to clear");
      });
  };
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
          <Button onPress={ClearAllData}>
            <Text
              _light={{ color: "myColors.light30" }}
              _dark={{ color: "myColors.light30" }}
            >
              Clear all Data
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}
