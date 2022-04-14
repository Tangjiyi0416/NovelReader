import { Box, Center, Flex, Image, Text, Pressable } from "native-base";
import React from "react";
import { toWords } from "number-to-chinese-words";
export default function BookButton({
  bookData,
  width,
  height,
  mode,
  onPress,
  ...props
}) {
  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => (
        <Flex
          shadow={3}
          width={width}
          height={height}
          _light={{ bgColor: "myColors.lightCard" }}
          _dark={{ bgColor: "myColors.darkCard" }}
          borderRadius={6}
          justify={mode === "big" ? "space-evenly" : "center"}
          align="center"
          direction={mode === "big" ? "row" : "column"}
          overflow="hidden"
          opacity={isPressed ? 0.8 : 1}
          {...props}
        >
          {mode === "big" ? (
            <Image
              source={{
                uri: bookData.cover,
              }}
              width={168}
              height={240}
              alt="book cover"
              top="12%"
            />
          ) : (
            <Image
              source={{
                uri: bookData.cover,
              }}
              width={140}
              height={200}
              alt="book cover"
            />
          )}

          <Flex direction="column" align="center">
            <Text numberOfLines={1} fontSize={22}>
              {bookData.title}
            </Text>
            <Flex
              direction={mode === "big" ? "column" : "row"}
              align="center"
              opacity={0.5}
              w="100%"
            >
              {bookData.progress?.chapter ? (
                <Text mx={2} fontSize={20}>
                  {bookData.chapterDisplay?.chapter?.pre ?? null}
                  {bookData.chapterDisplay?.chapter?.mode == "一"
                    ? toWords(bookData.progress.chapter)
                    : bookData.progress.chapter}
                  {bookData.chapterDisplay?.chapter?.suf ?? null}
                </Text>
              ) : (
                <Text mx={2} fontSize={20}>
                  未閱讀
                </Text>
              )}
              {bookData.progress?.section ? (
                <Text mx={2} fontSize={20}>
                  {bookData.chapterDisplay?.section?.pre ?? null}
                  {bookData.chapterDisplay?.section?.mode == "一"
                    ? toWords(bookData.progress.section)
                    : bookData.progress.section}
                  {bookData.chapterDisplay?.section?.suf ?? null}
                </Text>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Pressable>
  );
}
