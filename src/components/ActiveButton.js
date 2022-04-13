import { Box, Button, Icon } from "native-base";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorMode } from "native-base";
export default function ActiveButton({ name, iconSize, onPress, ...props }) {
  const { colorMode } = useColorMode();
  return (
    <Button
      onPress={onPress}
      alignItems="center"
      justifyContent="center"
      width={50}
      height={50}
      borderRadius={25}
      colorScheme={colorMode === "light" ? "primary" : "darkPrimary"}
      {...props}
    >
      <Icon
        as={MaterialCommunityIcons}
        name={name}
        size={iconSize}
        _light={{ color: "myColors.light60" }}
        _dark={{ color: "myColors.dark60" }}
      />
    </Button>
  );
}
