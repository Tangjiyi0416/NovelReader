import { Box, Button, Icon, HStack, Text, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default TransButton = ({ name, onPress, ...props }) => (
  <Button
    size="40px"
    alignItems="center"
    justifyContent="center"
    colorScheme="myButton"
    onPress={onPress}
    {...props}
  >
    <Icon as={MaterialCommunityIcons} name={name} size="24px" />
  </Button>
);
