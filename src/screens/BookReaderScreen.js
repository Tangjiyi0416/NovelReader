import React from "react";
import { Box, Text } from "native-base";

export default function BookReaderScreen({ route }) {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Text>{route.params.book.title}</Text>
    </Box>
  );
}
