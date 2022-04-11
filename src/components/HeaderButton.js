import { Box, Button, Icon, HStack, Text, useColorMode } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default HeaderButton = ({ name, onPress, ...props }) => (
  <Button
    size="40px"
    alignItems="center"
    justifyContent="center"
    variant="unstyled"
    onPress={onPress}
    {...props}
  >
    <Icon as={MaterialCommunityIcons} name={name} size="24px" />
  </Button>
);
