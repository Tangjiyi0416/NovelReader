import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, FlatList, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DetailedBookButton } from "../components/BookButton";
import { useSelector } from "react-redux";
import { selectBookList } from "../redux/bookListSlice";
export default function BookShelfScreen({ navigation }) {
  const bookList = useSelector(selectBookList);
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    setCurrentList(Object.values(bookList));
  }, [bookList]);
  const bookNormal = ({ item }) => (
    <DetailedBookButton
      ml={4}
      my={2}
      width={200}
      height={290}
      bookData={item}
    />
  );
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
      <Flex direction="row" justify="space-between">
        <Button colorScheme="myButton" mr={4}>
          <Icon as={MaterialCommunityIcons} name="pencil" size={8} />
        </Button>
      </Flex>
      <FlatList
        mb={50} //tabbar height
        data={currentList}
        keyExtractor={(item, index) => index}
        renderItem={bookNormal}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
}
