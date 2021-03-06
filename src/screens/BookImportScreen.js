import React, { useState } from "react";
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
  useToast,
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
import SelectionList from "../components/SeletionList";

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
            <Text fontSize={20}>??????</Text>
          </FormControl.Label>
          <Input
            key="??????"
            fontSize={16}
            mb={6}
            variant="underlined"
            _light={{ borderColor: "myColors.lightText" }}
            _dark={{ borderColor: "myColors.darkText" }}
            placeholder="??????"
            defaultValue={bookData.title}
            onChangeText={(value) => {
              dispatch(setBookData({ title: value }));
            }}
          />
        </FormControl>

        <FormControl.Label m={0}>
          <Text fontSize={20}>??????</Text>
        </FormControl.Label>
        <Input
          key="??????"
          fontSize={16}
          mb={6}
          variant="underlined"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          placeholder="??????"
          defaultValue={bookData.author}
          onChangeText={(value) => {
            dispatch(setBookData({ author: value }));
          }}
        />
        <FormControl.Label m={0}>
          <Text fontSize={20}>??????</Text>
        </FormControl.Label>
        <Input
          key="??????"
          fontSize={16}
          mb={6}
          variant="underlined"
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
          placeholder="??????"
          defaultValue={bookData.desc}
          onChangeText={(value) => {
            dispatch(setBookData({ desc: value }));
          }}
        />
        <SelectionList />
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
      <Text fontSize={24}>?????????????????????</Text>
      <VStack
        p={4}
        width={"98%"}
        my={5}
        borderRadius={6}
        shadow={3}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
      >
        {/* <FormControl.Label m={0}>
          <Text fontSize={20}>??????????????????</Text>
        </FormControl.Label>
        <Select
          key="??????????????????"
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
          <Select.Item label="?????????????????????" value="1" />
          <Select.Item label="?????????2" value="2" />
          <Select.Item label="?????????3" value="3" />
          <Select.Item label="?????????4" value="4" />
          <Select.Item label="?????????5" value="5" />
        </Select> */}
        <FormControl.Label m={0}>
          <Text fontSize={20}>????????????????????????</Text>
        </FormControl.Label>
        <HStack alignItems={"center"}>
          <FormControl.Label m={0}>
            <Text fontSize={12}>??????</Text>
          </FormControl.Label>
          <Input
            ml={1}
            mr={2}
            value={bookData?.chapterDisplay?.pre}
            flex={1}
            placeholder={"???"}
            onChangeText={(value) => {
              dispatch(
                setBookData({
                  chapterDisplay: { ...bookData?.chapterDisplay, pre: value },
                })
              );
            }}
          />
          <FormControl.Label m={0}>
            <Text fontSize={12}>???</Text>
          </FormControl.Label>
          <Select
            ml={1}
            mr={2}
            flex={1}
            key="chpaterNum"
            variant="underlined"
            fontSize={16}
            selectedValue={bookData?.chapterDisplay?.num}
            onValueChange={(value) => {
              dispatch(
                setBookData({
                  chapterDisplay: { ...bookData?.chapterDisplay, num: value },
                })
              );
            }}
            accessibilityLabel="chapter num"
            placeholder="???"
            _light={{ borderColor: "myColors.lightText" }}
            _dark={{ borderColor: "myColors.darkText" }}
            _selectedItem={{
              bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
            }}
            mt={1}
          >
            <Select.Item label="???" value="???" />
            <Select.Item label="1" value="1" />
          </Select>
          <FormControl.Label m={0}>
            <Text fontSize={12}>??????</Text>
          </FormControl.Label>
          <Input
            ml={1}
            mr={2}
            value={bookData?.chapterDisplay?.suf}
            flex={1}
            placeholder={"???"}
            onChangeText={(value) => {
              dispatch(
                setBookData({
                  chapterDisplay: { ...bookData?.chapterDisplay, suf: value },
                })
              );
            }}
          />
        </HStack>
        <FormControl.Label m={0}>
          <Text fontSize={20}>????????????????????????</Text>
        </FormControl.Label>
        <HStack alignItems={"center"}>
          <FormControl.Label m={0}>
            <Text fontSize={12}>??????</Text>
          </FormControl.Label>
          <Input
            ml={1}
            mr={2}
            value={bookData?.sectionDisplay?.pre}
            flex={1}
            placeholder={"???"}
            onChangeText={(value) => {
              dispatch(
                setBookData({
                  sectionDisplay: { ...bookData?.sectionDisplay, pre: value },
                })
              );
            }}
          />
          <FormControl.Label m={0}>
            <Text fontSize={12}>???</Text>
          </FormControl.Label>
          <Select
            ml={1}
            mr={2}
            flex={1}
            key="chpaterNum"
            variant="underlined"
            fontSize={16}
            selectedValue={bookData?.sectionDisplay?.num}
            onValueChange={(value) => {
              dispatch(
                setBookData({
                  sectionDisplay: { ...bookData?.sectionDisplay, num: value },
                })
              );
            }}
            accessibilityLabel="chapter num"
            placeholder="???"
            _light={{ borderColor: "myColors.lightText" }}
            _dark={{ borderColor: "myColors.darkText" }}
            _selectedItem={{
              bg: colorMode === "light" ? "primary.500" : "darkPrimary.500",
            }}
            mt={1}
          >
            <Select.Item label="???" value="???" />
            <Select.Item label="1" value="1" />
          </Select>
          <FormControl.Label m={0}>
            <Text fontSize={12}>??????</Text>
          </FormControl.Label>
          <Input
            ml={1}
            mr={2}
            flex={1}
            value={bookData?.sectionDisplay?.suf}
            placeholder={"???"}
            onChangeText={(value) => {
              dispatch(
                setBookData({
                  sectionDisplay: { ...bookData?.sectionDisplay, suf: value },
                })
              );
            }}
          />
        </HStack>
      </VStack>
      <Text fontSize={24}>??????????????????</Text>
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
        <Button
          flex={1}
          mr={4}
          _light={{ colorScheme: "primary" }}
          _dark={{ colorScheme: "darkPrimary" }}
        >
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.dark30" }}
          >
            ?????????
          </Text>
        </Button>
        <Button
          flex={1}
          _light={{ colorScheme: "primary" }}
          _dark={{ colorScheme: "darkPrimary" }}
        >
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.dark30" }}
          >
            ?????????
          </Text>
        </Button>
      </HStack>
      <Text fontSize={24}>??????????????????</Text>
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
        <Button
          flex={1}
          mr={4}
          _light={{ colorScheme: "primary" }}
          _dark={{ colorScheme: "darkPrimary" }}
        >
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.dark30" }}
          >
            GBK to UTF-8
          </Text>
        </Button>
        <Button
          flex={1}
          _light={{ colorScheme: "primary" }}
          _dark={{ colorScheme: "darkPrimary" }}
        >
          <Text
            _light={{ color: "myColors.light30" }}
            _dark={{ color: "myColors.dark30" }}
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
    { key: "first", title: "????????????" },
    { key: "second", title: "????????????" },
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
    const [saving, setSaving] = useState(false);
    const bookData = useSelector(selectBookImportData);
    const toast = useToast();
    function saveBook() {
      setSaving(true);
      const path =
        FileSystem.documentDirectory + "books/" + bookData.title + ".txt";
      let content;
      let indexes = [];
      FileSystem.readAsStringAsync(bookData.uri)
        .catch(() => {
          toast.show({
            description: "reading faild.",
            bg: "danger.500",
          });
        })
        .then((result) => {
          console.log(bookData.uri);
          content = result
            .split("\n")
            .filter((line) => line[0] != "\r" && line[0] != "\n");
          let chpaterTest = new RegExp(
            `^[ ???	]*${bookData.chapterDisplay.pre}.+${bookData.chapterDisplay.suf}[ ]`
          );
          let sectionTest = new RegExp(
            `^[ ???	]*${bookData.sectionDisplay.pre}.+${bookData.sectionDisplay.suf}[ ]`
          );
          // console.log(content);
          content.forEach((line, index) => {
            // console.log(line);
            if (bookData.chapterDisplay && chpaterTest.test(line)) {
              // currentChapter = index;
              // indexes[currentChapter] = [];
              indexes.push([index]);
            } else if (bookData.sectionDisplay && sectionTest.test(line)) {
              // indexes[currentChapter].push(index);
              if (indexes.length == 0) indexes.push([]);
              indexes[indexes.length - 1].push(index);
            }
          });
        })
        .catch(() => {
          toast.show({
            description: "index parsing faild",
            bg: "danger.500",
          });
          setSaving(false);
        })
        .then(() => {
          FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + "books/",
            {
              intermediates: true,
            }
          ).then(() => {
            FileSystem.writeAsStringAsync(path, content.join("\n"))
              .catch(() => console.log("saving faild."))
              .then(() => {
                dispatch(
                  addBook({
                    ...bookData,
                    totalLines: content.length,
                    indexes: indexes,
                    uri: path,
                    time: Date.now(),
                  })
                );
                // console.log(bookData);
                console.log("info updated.");
                navigation.goBack();
              });
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
        onPress={!saving ? saveBook : null}
        // onPress={saveBook}
      >
        <Text
          mx={1}
          fontSize={18}
          _light={{ color: "myColors.light30" }}
          _dark={{ color: "myColors.dark30" }}
        >
          {saving ? "?????????..." : "??????"}
          {/* ?????? */}
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
          ????????????
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
        chapterDisplay: {
          pre: "???",
          num: "???",
          suf: "???",
        },
        sectionDisplay: {
          pre: "???",
          num: "???",
          suf: "???",
        },
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
