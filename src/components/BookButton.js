import { Box, Center, Flex, Image, Text, Pressable } from "native-base";
import React, { useState, useEffect } from "react";
import { toWords } from "number-to-chinese-words";
import { useNavigation } from "@react-navigation/native";
export function DetailedBookButton({ bookData, width, height, ...props }) {
  const navigation = useNavigation();

  const ProgressDisplay = () => {
    return (
      <Flex direction={"row"} align="center" opacity={0.5} w="100%">
        {bookData.progress ? (
          <Text mx={2} fontSize={20}>
            {bookData.chapterDisplay?.pre ?? null}
            {bookData.chapterDisplay?.num == "一"
              ? toWords(bookData.progress)
              : bookData.progress}
            {bookData.chapterDisplay?.suf ?? null}
          </Text>
        ) : (
          <Text mx={2} fontSize={20}>
            未閱讀
          </Text>
        )}
        {bookData.progress ? (
          <Text mx={2} fontSize={20}>
            {bookData.sectionDisplay?.pre ?? null}
            {bookData.sectionDisplay?.num == "一"
              ? toWords(bookData.progress)
              : bookData.progress}
            {bookData.sectionDisplay?.suf ?? null}
          </Text>
        ) : null}
      </Flex>
    );
  };
  return (
    <Pressable
      onPress={() => navigation.navigate("BookReader", { book: bookData })}
      _pressed={{ opacity: 0.8 }}
    >
      <Flex
        shadow={3}
        w={width}
        h={height}
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
          width={112}
          height={160}
          alt="book cover"
        />
        <Flex direction="column" align="center">
          <Text numberOfLines={1} fontSize={22}>
            {bookData.title}
          </Text>
          <ProgressDisplay />
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
  const binarySearch = (arr, target) => {
    let min = 0,
      max = arr.length - 1;
    while (min != max) {
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
  };
  // useEffect(() => {
  //   const chs = bookData.indexes.map((x) => x[0]);
  //   const ch = binarySearch(chs, bookData.progress);
  //   setChapter(ch + 1);
  //   console.log(bookData.indexes[ch]);
  //   // const sec = binarySearch(bookData.indexes[ch], bookData.progress);
  //   //   setSection(binarySearch(bookData.indexes[ch], bookData.progress) + 1);
  //   //   console.log(section + 1);
  // }, []);
  const ProgressDisplay = () => {
    return (
      <Flex
        direction={styleType == 1 ? "column" : "row"}
        align="center"
        opacity={0.5}
        w="100%"
      >
        {bookData.progress ? (
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
        {bookData.progress ? (
          <Text mx={2} fontSize={20}>
            {bookData.sectionDisplay?.pre ?? null}
            {bookData.sectionDisplay?.num == "一" ? toWords(section) : section}
            {bookData.sectionDisplay?.suf ?? null}
          </Text>
        ) : null}
      </Flex>
    );
  };
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
          width={112}
          height={160}
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
