import React from "react";
import {
  Box,
  Text,
  Button,
  useColorMode,
  HStack,
  Pressable,
  useColorModeValue,
  ScrollView,
} from "native-base";
import * as FileSystem from "expo-file-system";
import TransButton from "../components/TransButton";
import { SceneMap, TabView } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";

const FirstRoute = () => <ScrollView flex={1}></ScrollView>;

const SecondRoute = () => <ScrollView flex={1}></ScrollView>;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function BookImportScreen({ route, navigation }) {
  const { colorMode } = useColorMode();
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
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "詳細資料" },
    { key: "second", title: "導入設定" },
  ]);
  const myHeader = ({ navigation }) => (
    <HStack
      pt={1}
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={colorMode === "light" ? "myColors.light60" : "#222629"}
    >
      <HStack alignItems="center">
        <TransButton m={1} name="close" onPress={navigation.goBack} size={8} />
        <Text
          fontSize={18}
          _light={{ color: "myColors.lightText" }}
          _dark={{ color: "myColors.darkText" }}
        >
          導入書本
        </Text>
      </HStack>
      <Button borderRadius={50} height={8} py={0} mr={4}>
        <Text
          _light={{ color: "myColors.light30" }}
          _dark={{ color: "myColors.dark30" }}
        >
          儲存
        </Text>
      </Button>
    </HStack>
  );
  React.useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      header: myHeader,
      headerShown: true,
    });
  }, []);

  return (
    <Box
      flex={1}
      px={4}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      ;
      {/* <Text>BookImportScreen</Text>
      <Text>{route.params.documentResult.name}</Text> */}
    </Box>
  );
}
