import React, { useEffect, useState } from "react";
import { Box, FlatList, ScrollView, Text } from "native-base";
import BookButtonNormal from "../components/BookButton";
import { useDispatch, useSelector } from "react-redux";
import { selectLastReadTitle } from "../redux/lastReadSlice";
import { selectBookList } from "../redux/bookListSlice";

export default function HomeScreen({ navigation }) {
  const lastReadTitle = useSelector(selectLastReadTitle);
  const booklist = useSelector(selectBookList);
  const [unread, setUnread] = useState([]);
  const [added, setAdded] = useState([]);
  useEffect(() => {
    setUnread(
      Object.entries(booklist)
        .filter(([key, value]) => !value.progress)
        .sort((a, b) => {
          if (a[1].time < b[1].time) return -1;
          if (a[1].time > b[1].time) return 1;
          return 0;
        })
    );
    setAdded(
      Object.entries(booklist)
        .filter(([key, value]) => Date.now() - value.time < 604800000) //一周內
        .sort((a, b) => {
          if (a[1].time < b[1].time) return 1;
          if (a[1].time > b[1].time) return -1;
          return 0;
        })
        .slice(0, 5)
    );
    // setAdded(Object.entries(booklist).filter(([key,value])=>!value.progress));
  }, [booklist]);
  const bookNormal = ({ item }) => (
    <BookButtonNormal
      ml={4}
      my={2}
      width={200}
      height={290}
      bookData={item[1]}
    />
  );

  return (
    <Box
      flex={1}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <ScrollView
        mb={50} //tabbar height
      >
        {booklist[lastReadTitle] && (
          <Box>
            <Text ml={4} fontSize="3xl">
              繼續閱讀
            </Text>
            <BookButtonNormal
              mx={4}
              my={2}
              styleType={1}
              bookData={booklist[lastReadTitle]}
              height={160}
            />
          </Box>
        )}

        <Box>
          {unread.length > 0 && (
            <Text ml={4} fontSize="3xl">
              尚未閱讀
            </Text>
          )}
          <FlatList
            horizontal={true}
            data={unread}
            keyExtractor={(item, index) => index}
            renderItem={bookNormal}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
        <Box>
          {added.length > 0 && (
            <Text ml={4} fontSize="3xl">
              最近新增
            </Text>
          )}
          <FlatList
            horizontal={true}
            data={added}
            keyExtractor={(item, index) => index}
            renderItem={bookNormal}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
      </ScrollView>
      {/* <SectionList
        mb={50} //tabbar height
        sections={data}
        keyExtractor={(item, index) => item + index}
        stickySectionHeadersEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={() => null}
        renderSectionHeader={sections}
      /> */}
    </Box>
  );
}
