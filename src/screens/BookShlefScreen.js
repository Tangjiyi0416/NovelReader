import React, { useEffect, useState } from "react";
import { Box, Button, Text, FlatList } from "native-base";
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
  const TagButton = ({ item }) => {
    const [isSelected, setSelected] = useState();
    return (
      <Button
        variant="outline"
        mx={2}
        _light={{
          backgroundColor: isSelected ? "myColors.light10" : "transparent",
          borderColor: "myColors.light10",
          _pressed: {
            backgroundColor: "myColors.light10",
            borderColor: "myColors.light10",
            opacity: 0.6,
          },
        }}
        _dark={{
          borderColor: "myColors.dark10",
          _pressed: {
            backgroundColor: "myColors.dark10",
            borderColor: "myColors.dark10",
            opacity: 0.6,
          },
        }}
        onPress={() => {
          setSelected(!isSelected);
        }}
      >
        <Text
          _light={{
            color: isSelected ? "myColors.light30" : "myColors.lightText",
          }}
          _dark={{
            color: isSelected ? "myColors.dark30" : "myColors.darkText",
          }}
          fontSize={18}
          lineHeight={30}
        >
          {item}
        </Text>
      </Button>
    );
  };
  const renderTag = ({ item }) => <TagButton item={item} />;
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
          renderItem={renderTag}
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
