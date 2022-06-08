import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  FlatList,
  Icon,
  Slide,
  SlideFade,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DetailedBookButton } from "../components/BookButton";
import { useSelector } from "react-redux";
import { selectBookList } from "../redux/bookListSlice";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
export default function BookShelfScreen({ route, navigation }) {
  const bookList = useSelector(selectBookList);
  const [currentList, setCurrentList] = useState([]);
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  useFocusEffect(
    React.useCallback(() => {
      offset.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
      return () => {};
    }, [])
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      offset.value = 100;
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setCurrentList(Object.values(bookList));
  }, [bookList]);
  const book = ({ item }) => (
    <DetailedBookButton mx={4} my={2} flex={1} height={250} bookData={item} />
  );
  return (
    <Box
      flex={1}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Animated.View style={animatedStyles}>
        <FlatList
          m={2}
          horizontal={true}
          flexGrow={0}
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
        <FlatList
          mb={50} //tabbar height
          data={currentList}
          keyExtractor={(item, index) => index}
          renderItem={book}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
    </Box>
  );
}
