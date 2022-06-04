import { Box, Center, Flex, Image, Text, Pressable } from "native-base";
import React from "react";
import { toWords } from "number-to-chinese-words";
import { useNavigation } from "@react-navigation/native";

export default function BookButton({
  bookData,
  width,
  height,
  styleType,
  ...props
}) {
  const navigation = useNavigation();

  const ProgressDisplay = () => {
    return (
      <Flex
        direction={styleType == 1 ? "column" : "row"}
        align="center"
        opacity={0.5}
        w="100%"
      >
        {bookData.progress?.chapter ? (
          <Text mx={2} fontSize={20}>
            {bookData.chapterDisplay?.pre ?? null}
            {bookData.chapterDisplay?.num == "一"
              ? toWords(bookData.progress.chapter)
              : bookData.progress.chapter}
            {bookData.chapterDisplay?.suf ?? null}
          </Text>
        ) : (
          <Text mx={2} fontSize={20}>
            未閱讀
          </Text>
        )}
        {bookData.progress?.section ? (
          <Text mx={2} fontSize={20}>
            {bookData.sectionDisplay?.pre ?? null}
            {bookData.sectionDisplay?.num == "一"
              ? toWords(bookData.progress.section)
              : bookData.progress.section}
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
            uri: bookData.cover,
          }}
          width={140}
          height={200}
          alt="book cover"
        />
        <Flex direction="column" align="center" justify="space-evenly">
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
