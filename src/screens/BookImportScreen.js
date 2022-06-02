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
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookImportData,
  setBookData,
} from "../redux/bookImportDataSlice";
import { addBook } from "../redux/bookListSlice";

const FirstRoute = () => {
  const { colorMode } = useColorMode();

  const bookData = useSelector(selectBookImportData);
  const dispatch = useDispatch();
  return bookData ? (
    <ScrollView
      flex={1}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
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
          <Select.Item key={"s1"} label="將來可自定義的標簽1" value="tag1" />
          <Select.Item key={"s2"} label="將來可自定義的標簽2" value="tag2" />
          <Select.Item key={"s3"} label="將來可自定義的標簽3" value="tag3" />
          <Select.Item key={"s4"} label="將來可自定義的標簽4" value="tag4" />
          <Select.Item key={"s5"} label="將來可自定義的標簽5" value="tag5" />
        </Select>
      </VStack>
    </ScrollView>
  ) : null;
};

const SecondRoute = () => {
  const { colorMode } = useColorMode();
  const bookData = useSelector(selectBookImportData);
  const dispatch = useDispatch();
  return bookData ? (
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
            let chapter = {};
            switch (value) {
              case "第一部":
                chapter = {
                  pre: "第",
                  num: "一",
                  suf: "部",
                };
                break;
              case "第1部":
                chapter = {
                  pre: "第",
                  num: "1",
                  suf: "部",
                };
                break;
              case "part 1":
                chapter = {
                  pre: "part ",
                  num: "1",
                };
                break;
              case "chapter 1":
                chapter = {
                  pre: "charpter ",
                  num: "1",
                };
                break;
              default:
                break;
            }
            dispatch(
              setBookData({
                chapterDisplay: { ...chapter },
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
            let section = {};
            switch (value) {
              case "第一章":
                section = {
                  pre: "第",
                  num: "一",
                  suf: "章",
                };
                break;
              case "第1章":
                section = {
                  pre: "第",
                  num: "1",
                  suf: "章",
                };
                break;
              case "section 1":
                section = {
                  pre: "section ",
                  num: "1",
                };
                break;
              case "第一回":
                section = {
                  pre: "第",
                  num: "1",
                  suf: "回",
                };
                break;
              case "第1回":
                section = {
                  pre: "第",
                  num: "1",
                  suf: "回",
                };
                break;
              default:
                break;
            }
            dispatch(
              setBookData({
                sectionDisplay: { ...section },
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
          <Select.Item key={"s1"} label="第一章、第二章" value="第一章" />
          <Select.Item key={"s2"} label="第1章、第2章" value="第1章" />
          <Select.Item
            key={"s3"}
            label="section 1、section 2"
            value="section 1"
          />
          <Select.Item key={"s4"} label="第一回、第二回" value="第一回" />
          <Select.Item key={"s5"} label="第1回、第2回" value="第1回" />
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
  ) : null;
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function BookImportScreen({ navigation, route }) {
  const { colorMode } = useColorMode();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "詳細資料" },
    { key: "second", title: "導入設定" },
  ]);
  const dispatch = useDispatch();
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

  function SaveButton() {
    const bookData = useSelector(selectBookImportData);
    function saveBook() {
      const path = FileSystem.documentDirectory + "books/";
      FileSystem.deleteAsync(path + bookData.title + ".txt", {
        idempotent: true,
      }).then(() => {
        FileSystem.copyAsync({
          from: bookData.uri,
          to: path,
        })
          .then(() => {
            console.warn("book copied successed, info updated.");
          })
          .catch(() => {
            console.warn("book exited, info updated.");
          })
          .finally(() => {
            dispatch(
              addBook({
                ...bookData,
                uri: path + bookData.title + ".txt",
              })
            );
            console.warn("book exited, info updated.");
            navigation.goBack();
          });
      });
    }
    return (
      <Button
        borderRadius={50}
        height={10}
        py={0}
        mr={4}
        _light={{ colorScheme: "primary" }}
        _dark={{ colorScheme: "darkPrimary" }}
        onPress={saveBook}
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
      <SaveButton />
    </HStack>
  );
  React.useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      header: myHeader,
      headerShown: true,
    });
    dispatch(
      setBookData({
        title: route.params.documentResult.name.slice(0, -4),
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
