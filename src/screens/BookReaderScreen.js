import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Spinner,
  Text,
  useToast,
  VStack,
  Center,
  Modal,
} from "native-base";
import ActiveButton from "../components/ActiveButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { selectSettings, setSettings } from "../redux/viewSettingSlice";
import { setLastRead } from "../redux/lastReadSlice";
import { addBook, selectBookList } from "../redux/bookListSlice";
const OverlayMenu = ({ overlayMenuIndex }) => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  switch (overlayMenuIndex) {
    case 0:
      return null;
    case 1:
      return null;
    case 2:
      return (
        <VStack
          w="3/4"
          _light={{ bgColor: "myColors.light30" }}
          _dark={{ bgColor: "myColors.dark30" }}
        >
          <Text fontSize={20} mt={3}>
            Padding (左右)
          </Text>
          <HStack justifyContent={"space-between"} alignItems="center">
            <ActiveButton
              w={8}
              h={8}
              onPress={() => {
                dispatch(setSettings({ px: settings.px - 10 }));
              }}
              name="minus"
            />
            <Text fontSize={26}>{settings.px}</Text>
            <ActiveButton
              w={8}
              h={8}
              onPress={() => {
                dispatch(setSettings({ px: settings.px + 10 }));
              }}
              name="plus"
            />
          </HStack>

          <Divider
            mt={4}
            _light={{ bg: "myColors.light30" }}
            _dark={{ bg: "myColors.dark30" }}
          />
        </VStack>
      );
    case 3:
      return null;
    case 4:
      return null;
    case 5:
      return null;
  }
};

const OverlayBar = ({ modalSetter, overlayMenuSetter, overlayMenuIndex }) => {
  return (
    <VStack bottom={0} position="absolute" width="100%">
      <HStack
        justifyContent="center"
        px={2}
        _light={{ bg: "myColors.light30" }}
        _dark={{ bg: "myColors.dark30" }}
      >
        <OverlayMenu overlayMenuIndex={overlayMenuIndex} />
      </HStack>
      <HStack
        px={2}
        _light={{ bg: "myColors.light30" }}
        _dark={{ bg: "myColors.dark30" }}
      >
        <Button
          flex={1}
          onPress={() => modalSetter(true)}
          colorScheme="myButton"
        >
          <Text fontSize={28}>目錄</Text>
        </Button>
        <Button
          flex={1}
          onPress={() => overlayMenuSetter(2)}
          colorScheme="myButton"
        >
          <Text fontSize={28}>版面</Text>
        </Button>
        <Button
          flex={1}
          onPress={() => overlayMenuSetter(3)}
          colorScheme="myButton"
        >
          <Text fontSize={28}>顏色</Text>
        </Button>
        <Button
          flex={1}
          onPress={() => overlayMenuSetter(4)}
          colorScheme="myButton"
        >
          <Text fontSize={28}>書籤</Text>
        </Button>
        <Button
          flex={1}
          onPress={() => overlayMenuSetter(5)}
          colorScheme="myButton"
        >
          <Icon as={MaterialCommunityIcons} name="dots-horizontal" size={12} />
        </Button>
      </HStack>
    </VStack>
  );
};
export default function BookReaderScreen({ route, navigation }) {
  const toast = useToast();
  const [content, setContent] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [showOverlay, setOverlay] = useState(false);
  const [overlayMenuIndex, setOverlayMenuIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentLine = useRef(0);
  const latestLine = useRef(0);
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const bookList = useSelector(selectBookList);
  const mainList = useRef(null);
  const indexList = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      dispatch(
        addBook({
          title: route.params.book.title,
          progress: currentLine.current,
          latestLine: latestLine.current + 1,
        })
      );
      // console.log("leaving");
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const bookData = route.params.book;
    // console.log(bookData);
    FileSystem.readAsStringAsync(bookData.uri)
      .catch(() => {
        setContent([
          "觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。舍利子，色不異空，空不異色；色即是空，空即是色。受、想、行、識，亦復如是。舍利子，是諸法空相，不生不滅，不垢不淨，不增不減，是故空中無色，無受、想、行、識；無眼、耳、鼻、舌、身、意；無色、聲、香、味、觸、法；無眼界，乃至無意識界；無無明，亦無無明盡；乃至無老死，亦無老死盡。無苦、集、滅、道，無智亦無得，以無所得故。菩提薩埵，依般若波羅蜜多故，心無罣礙。無罣礙故，無有恐怖，遠離顛倒夢想，究竟涅槃。三世諸佛，依般若波羅蜜多故，得阿耨多羅三藐三菩提。故知般若波羅蜜多，是大神咒，是大明咒，是無上咒，是無等等咒，能除一切苦，真實不虛。故說般若波羅蜜多咒，即說咒曰：「揭諦、揭諦，波羅揭諦，波羅僧揭諦，菩提薩婆訶。」觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。舍利子，色不異空，空不異色；色即是空，空即是色。受、想、行、識，亦復如是。舍利子，是諸法空相，不生不滅，不垢不淨，不增不減，是故空中無色，無受、想、行、識；無眼、耳、鼻、舌、身、意；無色、聲、香、味、觸、法；無眼界，乃至無意識界；無無明，亦無無明盡；乃至無老死，亦無老死盡。無苦、集、滅、道，無智亦無得，以無所得故。菩提薩埵，依般若波羅蜜多故，心無罣礙。無罣礙故，無有恐怖，遠離顛倒夢想，究竟涅槃。三世諸佛，依般若波羅蜜多故，得阿耨多羅三藐三菩提。故知般若波羅蜜多，是大神咒，是大明咒，是無上咒，是無等等咒，能除一切苦，真實不虛。故說般若波羅蜜多咒，即說咒曰：「揭諦、揭諦，波羅揭諦，波羅僧揭諦，菩提薩婆訶。」",
        ]);
        toast.show({
          description: "又讀不起來ㄟ，讀讀心經消消氣(X",
          bg: "danger.500",
        });
      })
      .then((result) => {
        const content = result.split("\n");
        setContent(content);
        const inds = bookData.indexes.flat().map((index) => {
          return { line: content[index], index: index };
        });
        setIndexes(inds);
        mainList.current?.scrollToIndex({
          index: bookList[bookData.title].progress ?? 0,
          viewPosition: 0,
        });
        // console.log(bookData);
        dispatch(setLastRead(bookData.title));
      })
      .catch(() => console.log("index parsing faild"))
      .then(console.log("loading successd"));
  }, []);
  const toggleOverlay = () => {
    // console.log("adw");
    // setTest(test + 1);
    setOverlay(!showOverlay);
    setOverlayMenuIndex(0);
    // console.log("c");
  };

  const renderLine = ({ item }) => <Text fontSize={24}>{`${item}\n`}</Text>;
  const renderIndex = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          // mainList.current.scrollToEnd({ animated: true });
          // console.log(item.index);
          mainList.current.scrollToIndex({
            index: item.index,
            viewPosition: 0,
          });
        }}
      >
        <Text fontSize={24}>{item.line}</Text>
      </Pressable>
    );
  };
  const listFooterComponent = () => {
    // return <Spinner size={110} accessibilityLabel="Loading posts" />;
    return isLoading ? (
      <Spinner
        size={110}
        accessibilityLabel="Loading posts"
        _light={{ color: "primary.500" }}
        _dark={{ color: "darkPrimary.500" }}
      />
    ) : null;
  };
  const onViewableItemsChanged = useCallback(function ({ viewableItems }) {
    // console.log("=========================================================");
    if (!viewableItems.length) return;
    currentLine.current = viewableItems[0].index;
    latestLine.current = viewableItems[viewableItems.length - 1].index;
    if (latestLine.current < route.params.book.totalLines - 1)
      setIsLoading(false);
    // console.log(viewableItems[viewableItems.length - 1]);
  }, []);
  return (
    <Box
      safeArea={true}
      flex={1}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <FlatList
        ref={mainList}
        onTouchEnd={toggleOverlay}
        ListFooterComponent={listFooterComponent}
        maxToRenderPerBatch={100}
        // updateCellsBatchingPeriod={500}
        data={content}
        renderItem={renderLine}
        keyExtractor={(item, index) => index}
        px={`${settings.px}px`}
        width={"100%"}
        flex={1}
        viewabilityConfig={{ itemVisiblePercentThreshold: 98 }}
        onViewableItemsChanged={onViewableItemsChanged}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          mainList.current?.scrollToOffset({
            offset: averageItemLength * index,
          });
          setTimeout(() => {
            mainList.current?.scrollToIndex({ index: index });
          }, 200);
        }}
      />
      {showOverlay ? (
        <ActiveButton
          position="absolute"
          left={4}
          top={4}
          name="arrow-left"
          iconSize={8}
          onPress={navigation.goBack}
          shadow={3}
        />
      ) : null}
      {showOverlay ? (
        <OverlayBar
          modalSetter={setModalVisible}
          overlayMenuSetter={setOverlayMenuIndex}
          overlayMenuIndex={overlayMenuIndex}
        />
      ) : null}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"full"}>
        <Modal.Content maxH="60%">
          <Modal.CloseButton />
          <Modal.Header>目錄</Modal.Header>
          {/* <Modal.Body> */}
          <FlatList
            ref={indexList}
            ListFooterComponent={() => (
              <Spinner size={30} accessibilityLabel="Loading indexes" />
            )}
            data={indexes}
            renderItem={renderIndex}
            keyExtractor={(item, index) => index}
          />
          {/* </Modal.Body> */}
        </Modal.Content>
      </Modal>
    </Box>
  );
}
