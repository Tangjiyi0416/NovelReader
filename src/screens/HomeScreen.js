import React, { useState } from "react";
import {
  Box,
  Button,
  FlatList,
  SectionList,
  IconButton,
  Text,
} from "native-base";
import BookButton from "../components/BookButton";
// import testBookMap from "../test/books.json";
import testData from "../test/testData.json";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen({ navigation }) {
  const path = FileSystem.documentDirectory;
  const { bookMap } = useSelector((state) => state.bookData);
  const dispatch = useDispatch();
  const [data, setData] = useState(testData);
  // console.warn(bookMap);
  // console.warn(path + "books.jsonh");
  React.useEffect(() => {
    FileSystem.readAsStringAsync(path + "books.json")
      .then((result) => {
        bookMap = JSON.parse(result);
      })
      .catch(() => console.warn("no record yet."))
      .finally(() => {
        setData([...data, Object.keys(bookMap)]);
        setBookMap({ ...bookMap, ...testBookMap });
      });
  }, []);

  const bookBig = (item) => (
    <BookButton
      mx={4}
      my={2}
      navigation={navigation}
      bookData={bookMap[item]}
      height={160}
      mode="big"
      onPress={() => navigation.navigate("BookReader", { book: bookMap[item] })}
    />
  );
  const bookNormal = ({ item }) => (
    <BookButton
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
    if (section.title === "繼續閱讀")
      return (
        <Box mt={8}>
          <Text ml={4} fontSize="3xl">
            {section.title}
          </Text>
          {bookBig(section.data[0])}
        </Box>
      );
    return (
      <Box>
        <Text ml={4} fontSize="3xl">
          {section.title}
        </Text>
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
