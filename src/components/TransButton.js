import { Box, Button, Icon, HStack, Text, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default TransButton = ({ name, size, onPress, ...props }) => (
  <Button
    alignItems="center"
    justifyContent="center"
    colorScheme="myButton"
    onPress={onPress}
    {...props}
  >
    <Icon as={MaterialCommunityIcons} name={name} size={size} />
  </Button>
);
