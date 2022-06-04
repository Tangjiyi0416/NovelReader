import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  SectionList,
  FlatList,
  Icon,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BookButtonNormal from "../components/BookButton";
import bookMap from "../test/books.json";
import testData from "../test/testData2.json";
export default function BookShelfScreen({ navigation }) {
  const bookNormal = ({ item }) => (
    <BookButtonNormal
      ml={4}
      my={2}
      width={200}
      height={290}
      navigation={navigation}
      bookData={bookMap[item]}
      onPress={() => navigation.navigate("BookReader", { book: bookMap[item] })}
    />
  );
  const sections = ({ section }) => {
    return (
      <Box>
        <Flex direction="row" justify="space-between">
          <Text ml={4} fontSize="3xl">
            {section.title}
          </Text>
          <Button colorScheme="myButton" mr={4}>
            <Icon as={MaterialCommunityIcons} name="pencil" size={8} />
          </Button>
        </Flex>
        <FlatList
          horizontal={true}
          data={section.data}
          keyExtractor={(item) => item + section.title}
          renderItem={bookNormal}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    );
  };
  return (
    <Box
      flex={1}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <FlatList
        m={2}
        horizontal={true}
        data={["Psychological Horror", "Sci-fi", "Short"]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Button colorScheme="primary" mx={2}>
            <Text
              _light={{ color: "myColors.light30" }}
              _dark={{ color: "myColors.light60" }}
              fontSize={18}
            >
              {item}
            </Text>
          </Button>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <SectionList
        mb={50} //tabbar height
        sections={testData}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={() => null}
        renderSectionHeader={sections}
      />
    </Box>
  );
}
