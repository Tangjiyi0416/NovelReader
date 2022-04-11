import React from "react";
import { Box, Text, IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

// {FileSystem.readAsStringAsync(result.uri).then((str) => {
//   return str;
// })}

export default function BookImportScreen({ route, navigation }) {
  return (
    <Box
      flex={1}
      bg="#fff"
      alignItems="center"
      justifyContent="center"
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Text>BookImportScreen</Text>
      <Text>{route.params.documentResult.name}</Text>
      <IconButton
        size={"sm"}
        _icon={{
          as: MaterialCommunityIcons,
          name: "close",
        }}
        onPress={() => navigation.goBack()}
      />
    </Box>
  );
}
