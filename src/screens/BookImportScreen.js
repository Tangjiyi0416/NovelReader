import React from "react";
import { Box, Text, IconButton } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

export default function BookImportScreen({ route, navigation }) {
  // const toast = useToast();
  // let content;
  // React.useEffect(() => {
  //   FileSystem.readAsStringAsync(route.param?.book.uri)
  //     .then((result) => content)
  //     .catch(() =>
  //       toast.show({
  //         description: "faild to load target file",
  //         bg: "#F00",
  //       })
  //     );
  // }, []);
  navigation;
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
