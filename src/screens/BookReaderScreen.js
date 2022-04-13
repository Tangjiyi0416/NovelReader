import React from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  ScrollView,
  Spacer,
  Text,
  useToast,
} from "native-base";
import ActiveButton from "../components/ActiveButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

export default function BookReaderScreen({ route, navigation }) {
  const toast = useToast();
  let content;
  React.useEffect(() => {
    FileSystem.readAsStringAsync(route.param?.book.uri)
      .then((result) => content)
      .catch(() =>
        toast.show({
          description: "faild to load target file",
          bg: "#F00",
        })
      );
  }, []);

  return (
    <Box
      safeArea={true}
      flex={1}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Box flex={1}>
        {/* <Text>{route.params.book.title}</Text> */}

        <ScrollView px={4}>
          <Divider
            mt={4}
            _light={{ bg: "myColors.light60" }}
            _dark={{ bg: "myColors.dark60" }}
          />

          <Text>{content}</Text>
          <Divider
            mt={8}
            _light={{ bg: "myColors.light60" }}
            _dark={{ bg: "myColors.dark60" }}
          />
        </ScrollView>
        <ActiveButton
          position="absolute"
          left={4}
          top={4}
          name="arrow-left"
          iconSize={8}
          onPress={navigation.goBack}
          shadow={3}
        />
        <HStack
          width="100%"
          justifyContent="space-between"
          px={2}
          bottom={0}
          position="absolute"
          _light={{ bg: "myColors.light30" }}
          _dark={{ bg: "myColors.dark30" }}
        >
          <Button colorScheme="myButton">
            <Text fontSize={28}>目錄</Text>
          </Button>
          <Button colorScheme="myButton">
            <Text fontSize={28}>版面</Text>
          </Button>
          <Button colorScheme="myButton">
            <Text fontSize={28}>顏色</Text>
          </Button>
          <Button colorScheme="myButton">
            <Text fontSize={28}>書籤</Text>
          </Button>
          <Button colorScheme="myButton">
            <Icon
              as={MaterialCommunityIcons}
              name="dots-horizontal"
              size={12}
            />
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
