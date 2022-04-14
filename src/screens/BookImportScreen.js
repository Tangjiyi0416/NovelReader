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
  const bookName = route.params.documentResult.name.slice(0, -4);
  React.useEffect(() => {
    dispatch(
      setBookData({
        title: bookName,
        author: "",
        desc: "",
        tags: [],
        cover:
          "https://raw.githubusercontent.com/Tangjiyi0416/app-wk3/main/img/img_book_tbos.png",
        chapterDisplay: {},
        uri: route.params.documentResult.uri,
        indexing: null,
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
            key="書名"
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
          key="作者"
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
          key="簡述"
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
          key="標籤"
          variant="underlined"
          fontSize={16}
          selectedValue={bookData.tags[0]}
          onValueChange={(value) => {
            dispatch(setBookData({ tags: [value] }));
          }}
          accessibilityLabel="Choose a Tag"
          placeholder="Choose a Tag"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          _selectedItem={{
            bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
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

const SecondRoute = () => {
  const { colorMode } = useColorMode();
  const { bookData } = useSelector((state) => state.bookData);
  const dispatch = useDispatch();
  return (
    <ScrollView flex={1}>
      <Text fontSize={24}>目錄檢測與顯示</Text>
      <VStack
        p={4}
        width={"98%"}
        my={5}
        borderRadius={6}
        shadow={3}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
      >
        <FormControl.Label m={0}>
          <Text fontSize={20}>目錄辨識方法</Text>
        </FormControl.Label>
        <Select
          key="目錄辨識方法"
          variant="underlined"
          fontSize={16}
          selectedValue={bookData.indexing}
          onValueChange={(value) => {
            dispatch(setBookData({ indexing: value }));
          }}
          accessibilityLabel="Indexing method"
          placeholder="Choose a Method"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          _selectedItem={{
            bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
          }}
          mt={1}
        >
          <Select.Item label="簡單縮排辨識法" value="1" />
          <Select.Item label="辨識法2" value="2" />
          <Select.Item label="辨識法3" value="3" />
          <Select.Item label="辨識法4" value="4" />
          <Select.Item label="辨識法5" value="5" />
        </Select>
        <FormControl.Label m={0}>
          <Text fontSize={20}>一級目錄顯示格式</Text>
        </FormControl.Label>
        <Select
          key="一級目錄顯示格式"
          variant="underlined"
          fontSize={16}
          // selectedValue={bookData.chapterDisplay?.chapter}
          onValueChange={(value) => {
            // console.warn(value);
            let data = {};
            switch (value) {
              case "第一部":
                data = {
                  pre: "第",
                  mode: "一",
                  suf: "部",
                };
                break;
              case "第1部":
                data = {
                  pre: "第",
                  mode: "1",
                  suf: "部",
                };
                break;
              case "part 1":
                data = {
                  pre: "part ",
                  mode: "1",
                };
                break;
              case "chapter 1":
                data = {
                  pre: "charpter ",
                  mode: "1",
                };
                break;
              default:
                break;
            }
            dispatch(
              setBookData({
                chapterDisplay: { ...bookData.chapterDisplay, chapter: data },
              })
            );
          }}
          accessibilityLabel="Indexing method"
          placeholder="Choose a Method"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          _selectedItem={{
            bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
          }}
          mt={1}
        >
          <Select.Item label="第一部、第二部" value="第一部" />
          <Select.Item label="第1部、第2部" value="第1部" />
          <Select.Item label="part 1、part 2" value="part 1" />
          <Select.Item label="chapter 1、chapter 2" value="chapter 1" />
        </Select>
        <FormControl.Label m={0}>
          <Text fontSize={20}>二級目錄顯示格式</Text>
        </FormControl.Label>
        <Select
          key="二級目錄顯示格式"
          variant="underlined"
          fontSize={16}
          onValueChange={(value) => {
            // console.warn(value);
            let data = {};
            switch (value) {
              case "第一章":
                data = {
                  pre: "第",
                  mode: "一",
                  suf: "章",
                };
                break;
              case "第1章":
                data = {
                  pre: "第",
                  mode: "1",
                  suf: "章",
                };
                break;
              case "section 1":
                data = {
                  pre: "section ",
                  mode: "1",
                };
                break;
              case "第一回":
                data = {
                  pre: "第",
                  mode: "1",
                  suf: "回",
                };
                break;
              case "第1回":
                data = {
                  pre: "第",
                  mode: "1",
                  suf: "回",
                };
                break;
              default:
                break;
            }
            dispatch(
              setBookData({
                chapterDisplay: { ...bookData.chapterDisplay, section: data },
              })
            );
          }}
          accessibilityLabel="Indexing method"
          placeholder="Choose a Method"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          _selectedItem={{
            bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
          }}
          mt={1}
        >
          <Select.Item label="第一章、第二章" value="第一章" />
          <Select.Item label="第1章、第2章" value="第1章" />
          <Select.Item label="section 1、section 2" value="section 1" />
          <Select.Item label="第一回、第二回" value="第一回" />
          <Select.Item label="第1回、第2回" value="第1回" />
        </Select>
      </VStack>
      <Text fontSize={24}>快速簡繁切換</Text>
      <HStack
        p={4}
        width={"98%"}
        my={5}
        borderRadius={6}
        justifyContent="space-between"
        shadow={3}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
      >
        <Button flex={1} mr={4}>
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.light60" }}
          >
            簡轉繁
          </Text>
        </Button>
        <Button flex={1}>
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.light60" }}
          >
            繁轉簡
          </Text>
        </Button>
      </HStack>
      <Text fontSize={24}>快速編碼切換</Text>
      <HStack
        p={4}
        width={"98%"}
        my={5}
        borderRadius={6}
        justifyContent="space-between"
        shadow={3}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
      >
        <Button flex={1} mr={4}>
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.light60" }}
          >
            GBK to UTF-8
          </Text>
        </Button>
        <Button flex={1}>
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.light60" }}
          >
            Big5 to UTF-8
          </Text>
        </Button>
      </HStack>
    </ScrollView>
  );
};
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
    const path = FileSystem.documentDirectory;
    // console.warn(path);
    let newData = {};
    // console.warn(path + "books.jsoni");

    FileSystem.readAsStringAsync(path + "books.json")
      .then((result) => {
        newData = JSON.parse(result);
      })
      .catch(() => console.warn("no record yet."))
      .finally(() => {
        FileSystem.getInfoAsync(newData[bookData.title]?.uri ?? "")
          .then(() => {
            newData[bookData.title] = { ...bookData };

            const json = JSON.stringify(newData);
            FileSystem.writeAsStringAsync(path + "books.json", json).then(
              () => {
                // console.warn("bookData saved.");
                console.warn("book exited");
                // console.warn(json);

                navigation.goBack();
              }
            );
          })
          .catch(() => {
            FileSystem.copyAsync({
              from: bookData.uri,
              to: path + "books/" + bookData.title + ".txt",
            }).then(() => {
              bookData.uri = path + "books/" + bookData.title + ".txt";
              newData[bookData.title] = { ...bookData };

              const json = JSON.stringify(newData);
              FileSystem.writeAsStringAsync(path + "books.json", json).then(
                () => {
                  // console.warn("bookData saved.");
                  console.warn("book copid");
                  console.warn(json);

                  navigation.goBack();
                }
              );
            });
          });
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
