import React from "react";
import {
  Box,
  Button,
  Text,
  ScrollView,
  VStack,
  Divider,
  useToast,
} from "native-base";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { clearBookList } from "../redux/bookListSlice";
import { resetSettings } from "../redux/viewSettingSlice";
import { setLastRead } from "../redux/lastReadSlice";
import { useColorMode } from "native-base";
import { clearTags } from "../redux/tagsSlice";
export default function SettingsScreen() {
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const dispatch = useDispatch();
  const ClearAllData = () => {
    const path = FileSystem.documentDirectory;
    FileSystem.deleteAsync(path + "books")
      .catch(() => {
        toast.show({
          description: "No data to clear.",
          bg: "danger.500",
        });
      })
      .then(() => {
        dispatch(clearBookList());
        dispatch(clearTags());
        dispatch(setLastRead(""));
        toast.show({
          description: "All data cleared.",
          bg: "danger.500",
        });
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
          <Button
            onPress={toggleColorMode}
            _light={{ colorScheme: "primary" }}
            _dark={{ colorScheme: "darkPrimary" }}
          >
            <Text
              _light={{ color: "myColors.light30" }}
              _dark={{ color: "myColors.dark30" }}
            >
              Color Mode
            </Text>
          </Button>
          <Divider
            h={5}
            _light={{ bgColor: "myColors.lightCard" }}
            _dark={{ bgColor: "myColors.darkCard" }}
          />
          <Button
            onPress={ClearAllData}
            _light={{ colorScheme: "primary" }}
            _dark={{ colorScheme: "darkPrimary" }}
          >
            <Text
              _light={{ color: "myColors.light30" }}
              _dark={{ color: "myColors.dark30" }}
            >
              Clear all Data
            </Text>
          </Button>
          <Divider
            h={5}
            _light={{ bgColor: "myColors.lightCard" }}
            _dark={{ bgColor: "myColors.darkCard" }}
          />
          <Button
            onPress={() => dispatch(resetSettings())}
            _light={{ colorScheme: "primary" }}
            _dark={{ colorScheme: "darkPrimary" }}
          >
            <Text
              _light={{ color: "myColors.light30" }}
              _dark={{ color: "myColors.dark30" }}
            >
              Reset View Settings
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}
