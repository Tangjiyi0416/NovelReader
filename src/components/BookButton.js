import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  Pressable,
  FlatList,
  Divider,
} from "native-base";
import React, { useState, useEffect } from "react";
import { toWords } from "number-to-chinese-words";
import { useNavigation } from "@react-navigation/native";
const binarySearch = (arr, target) => {
  try {
    let min = 0,
      max = arr.length - 1;
    while (min != max) {
      // console.log(min);
      let mid = Math.floor((min + max) / 2);
      if (arr[mid] == target) return mid;
      else if (arr[mid] > target) {
        max = mid - 1;
      } else {
        min = mid + 1;
      }
    }
    if (arr[min] > target) return min > 1 ? min - 1 : 0;
    else return min;
  } catch (e) {
    console.log(e);
  }
};
export function DetailedBookButton({ bookData, height, ...props }) {
  const navigation = useNavigation();
  const [chapter, setChapter] = useState(0);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const chs = bookData.indexes.map((x) => x[0]);
    const ch = binarySearch(chs, bookData.progress);
    setChapter(ch + 1);
    // console.log(bookData.indexes[ch]);
    const sec = binarySearch(bookData.indexes[ch], bookData.progress);
    setSection(sec + 1);
    // console.log(section + 1);
  }, [bookData]);
  const ProgressDisplay = ({ ...props }) => {
    return (
      <Flex direction={"row"} {...props}>
        {bookData.progress || bookData.progress == 0 ? (
          <Text fontSize={18}>
            {"上次看到： "}
            {bookData.chapterDisplay?.pre ?? null}
            {bookData.chapterDisplay?.num == "一" ? toWords(chapter) : chapter}
            {bookData.chapterDisplay?.suf ?? null}
          </Text>
        ) : (
          <Text fontSize={20}>未閱讀</Text>
        )}
        {bookData.progress || bookData.progress == 0 ? (
          <Text ml={2} fontSize={18}>
            {bookData.sectionDisplay?.pre ?? null}
            {bookData.sectionDisplay?.num == "一" ? toWords(section) : section}
            {bookData.sectionDisplay?.suf ?? null}
          </Text>
        ) : null}
      </Flex>
    );
  };

  const renderTags = ({ item }) => {
    return (
      <Box
        borderWidth={1}
        px={"8px"}
        py={"2px"}
        mx={1}
        borderRadius={4}
        _light={{ borderColor: "myColors.lightText" }}
        _dark={{ borderColor: "myColors.darkText" }}
      >
        <Text
          _light={{ borderColor: "myColors.lightText" }}
          _dark={{ borderColor: "myColors.darkText" }}
        >
          {item}
        </Text>
      </Box>
    );
  };
  const itemSeparatorComponent = () => <Box my={1} height={1}></Box>;
  return (
    <Pressable
      onPress={() => navigation.navigate("BookReader", { book: bookData })}
      _pressed={{ opacity: 0.8 }}
    >
      <Flex
        shadow={3}
        py={2}
        h={height}
        direction={"row"}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
        borderRadius={6}
        justify="space-evenly"
        overflow="hidden"
        {...props}
      >
        <Image
          source={{
            uri:
              bookData.cover ??
              "https://raw.githubusercontent.com/Tangjiyi0416/app-wk3/main/img/img_book_tbos.png",
          }}
          width="36%"
          height={undefined}
          aspectRatio={0.7}
          alt="book cover"
        />
        <Flex w={"50%"} direction="column">
          <Text alignSelf={"center"} numberOfLines={1} fontSize={22}>
            {bookData.title}
          </Text>
          <Box my={1} height={1}></Box>
          <ProgressDisplay />
          <Text fontSize={18}>{`進度： ${(
            (bookData.latestLine * 100 ?? 0) / bookData.totalLines
          ).toFixed(2)}%`}</Text>
          <Box my={1} height={1}></Box>
          <FlatList
            data={["awda", "awdawdfe", "ssssss", "dgdrdrt"]}
            numColumns={2}
            key={2}
            keyExtractor={(item, index) => index}
            renderItem={renderTags}
            ItemSeparatorComponent={itemSeparatorComponent}
          />
        </Flex>
      </Flex>
    </Pressable>
  );
}

export default function BookButton({
  bookData,
  width,
  height,
  styleType,
  ...props
}) {
  const navigation = useNavigation();
  const [chapter, setChapter] = useState(0);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const chs = bookData.indexes.map((x) => x[0]);
    //   // console.log(chs);
    const ch = binarySearch(chs, bookData.progress);
    setChapter(ch + 1);
    //   // console.log(bookData.indexes[ch]);
    const sec = binarySearch(bookData.indexes[ch], bookData.progress);
    setSection(sec + 1);
    //   // console.log(section + 1);
    // }, []);
  }, [bookData]);
  const ProgressDisplay = () => {
    return (
      <Flex
        direction={styleType == 1 ? "column" : "row"}
        align="center"
        opacity={0.5}
        w="100%"
      >
        {bookData.progress || bookData.progress == 0 ? (
          <Text mx={2} fontSize={20}>
            {bookData.chapterDisplay?.pre ?? null}
            {bookData.chapterDisplay?.num == "一" ? toWords(chapter) : chapter}
            {bookData.chapterDisplay?.suf ?? null}
          </Text>
        ) : (
          <Text mx={2} fontSize={20}>
            未閱讀
          </Text>
        )}
        {bookData.progress || bookData.progress == 0 ? (
          <Text mx={2} fontSize={20}>
            {bookData.sectionDisplay?.pre ?? null}
            {bookData.sectionDisplay?.num == "一" ? toWords(section) : section}
            {bookData.sectionDisplay?.suf ?? null}
          </Text>
        ) : null}
      </Flex>
    );
  };
  6 / 17;
  return (
    <Pressable
      onPress={() => navigation.navigate("BookReader", { book: bookData })}
      _pressed={{ opacity: 0.8 }}
    >
      <Flex
        shadow={3}
        pt={styleType == 1 ? 4 : 0}
        w={width}
        h={height}
        _light={{ bgColor: "myColors.lightCard" }}
        _dark={{ bgColor: "myColors.darkCard" }}
        borderRadius={6}
        justify="space-evenly"
        align={styleType == 1 ? "flex-start" : "center"}
        direction={styleType == 1 ? "row" : "column"}
        overflow="hidden"
        {...props}
      >
        <Image
          source={{
            uri:
              bookData.cover ??
              "https://raw.githubusercontent.com/Tangjiyi0416/app-wk3/main/img/img_book_tbos.png",
          }}
          width={styleType == 1 ? "36%" : "70%"}
          height={undefined}
          aspectRatio={0.7}
          alt="book cover"
        />
        <Flex
          direction="column"
          align="center"
          w={styleType == 1 ? "45%" : "auto"}
        >
          <Text
            numberOfLines={1}
            fontSize={22}
            height={styleType == 1 ? "40%" : "auto"}
          >
            {bookData.title}
          </Text>
          <ProgressDisplay />
        </Flex>
      </Flex>
    </Pressable>
  );
}
