import React from "react";
import {
  Box,
  Text,
  Image,
  Button,
  useColorMode,
  HStack,
  Pressable,
  Flex,
  ScrollView,
  Input,
  FormControl,
  VStack,
  Select,
} from "native-base";
import * as FileSystem from "expo-file-system";
import TransButton from "../components/TransButton";
import { SceneMap, TabView } from "react-native-tab-view";
import { useWindowDimensions } from "react-native";
import { TabBar } from "react-native-tab-view";
import { useRoute } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { setBookData } from "../redux/actions";

const FirstRoute = () => {
  const { colorMode } = useColorMode();
  const route = useRoute();
  const { bookData } = useSelector((state) => state.bookData);
  const dispatch = useDispatch();
  const bookName = route.params.documentResult.name;
  React.useEffect(() => {
    dispatch(
      setBookData({
        title: bookName,
        author: "",
        desc: "",
        tags: [],
        cover: "",
        chapterDisplay: {},
        uri: route.params.documentResult.uri,
      })
    );
  }, []);
  return (
    <ScrollView
      flex={1}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Pressable my={4} alignSelf={"center"}>
        {({ isPressed }) => (
          <Flex
            shadow={3}
            w={200}
            h={290}
            _light={{ bgColor: "myColors.lightCard" }}
            _dark={{ bgColor: "myColors.darkCard" }}
            borderRadius={6}
            justify="center"
            align="center"
            direction="column"
            overflow="hidden"
            opacity={isPressed ? 0.8 : 1}
          >
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/Tangjiyi0416/app-wk3/main/img/img_book_tbos.png",
              }}
              width={140}
              height={200}
              alt="book cover"
            />
          </Flex>
        )}
      </Pressable>
      <VStack
        p={4}
        width={"98%"}
        my={5}
        borderRadius={6}
        shadow={3}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
      >
        <FormControl isRequired>
          <FormControl.Label m={0}>
            <Text fontSize={20}>書名</Text>
          </FormControl.Label>
          <Input
            fontSize={16}
            mb={6}
            variant="underlined"
            _light={{ borderColor: "myColors.lightText" }}
            _dark={{ borderColor: "myColors.darkText" }}
            placeholder="書名"
            defaultValue={bookData.title}
            onChangeText={(value) => {
              dispatch(setBookData({ title: value }));
            }}
          />
        </FormControl>

        <FormControl.Label m={0}>
          <Text fontSize={20}>作者</Text>
        </FormControl.Label>
        <Input
          fontSize={16}
          mb={6}
          variant="underlined"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          placeholder="作者"
          defaultValue={bookData.author}
          onChangeText={(value) => {
            dispatch(setBookData({ author: value }));
          }}
        />
        <FormControl.Label m={0}>
          <Text fontSize={20}>簡述</Text>
        </FormControl.Label>
        <Input
          fontSize={16}
          mb={6}
          variant="underlined"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          placeholder="簡述"
          defaultValue={bookData.desc}
          onChangeText={(value) => {
            dispatch(setBookData({ desc: value }));
          }}
        />
        <FormControl.Label m={0}>
          <Text fontSize={20}>標籤</Text>
        </FormControl.Label>
        <Select
          variant="underlined"
          fontSize={16}
          selectedValue={(value) => {
            dispatch(setBookData({ tags: [value] }));
          }}
          accessibilityLabel="Choose a Tag"
          placeholder="Choose a Tag"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          _selectedItem={{
            bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
            tintColor:
              colorMode === "light"
                ? "myColors.lightText"
                : "myColors.darkText",
          }}
          mt={1}
        >
          <Select.Item label="將來可自定義的標簽1" value="tag1" />
          <Select.Item label="將來可自定義的標簽2" value="tag2" />
          <Select.Item label="將來可自定義的標簽3" value="tag3" />
          <Select.Item label="將來可自定義的標簽4" value="tag4" />
          <Select.Item label="將來可自定義的標簽5" value="tag5" />
        </Select>
      </VStack>
    </ScrollView>
  );
};

const SecondRoute = () => <ScrollView flex={1}></ScrollView>;
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function BookImportScreen({ navigation }) {
  const { colorMode } = useColorMode();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "詳細資料" },
    { key: "second", title: "導入設定" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        height: 6,
        backgroundColor: colorMode === "light" ? "#BC0B0B" : "#DFD2B8",
      }}
      style={{
        backgroundColor: colorMode === "light" ? "#E8E5D9" : "#222629",
        elevation: 0,
      }}
      labelStyle={{
        color: colorMode === "light" ? "#131313" : "#FAF7EE",
        fontSize: 24,
      }}
    />
  );

  function saveBook({ bookData }) {
    const path = FileSystem.documentDirectory + "books.json";

    let newData = {};

    FileSystem.readAsStringAsync(path)
      .then((result) => {
        newData = JSON.parse(result);
      })
      .then(() => {})
      // .catch(() => {
      //   console.warn("books.json not exited yet.");
      // })
      .finally(() => {
        newData[bookData.title] = { ...bookData };

        const json = JSON.stringify(newData);
        FileSystem.writeAsStringAsync(path, json).then(() => {
          // console.warn("bookData saved.");
          // console.warn(json);
          navigation.goBack();
        });
        // .catch(() => console.warn("bookData faild to save."));
      });
  }
  function SaveButton({ bookData }) {
    return (
      <Button
        borderRadius={50}
        height={10}
        py={0}
        mr={4}
        _light={{ colorScheme: "primary" }}
        _dark={{ colorScheme: "darkPrimary" }}
        onPress={() => saveBook(bookData)}
      >
        <Text
          mx={1}
          fontSize={18}
          _light={{ color: "myColors.light30" }}
          _dark={{ color: "myColors.dark30" }}
        >
          儲存
        </Text>
      </Button>
    );
  }
  const SaveButtonRedux = connect((state) => ({ bookData: state.bookData }))(
    SaveButton
  );
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
          fontSize={24}
          _light={{ color: "myColors.lightText" }}
          _dark={{ color: "myColors.darkText" }}
        >
          導入書本
        </Text>
      </HStack>
      <SaveButtonRedux />
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
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Box>
  );
}
