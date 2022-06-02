import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Hidden,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Slider,
  Spacer,
  Text,
  useToast,
  VStack,
} from "native-base";
import ActiveButton from "../components/ActiveButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import TransButton from "../components/TransButton";

export default function BookReaderScreen({ route, navigation }) {
  const toast = useToast();
  const [content, setContent] = useState("");
  const [showOverlay, setOverlay] = useState(false);
  const [overlayMenuIndex, setOverlayMenuIndex] = useState(0);
  const [pdx, setPdx] = useState(16);
  const OverlayMenu = () => {
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
                  setPdx(pdx + 5);
                }}
                name="plus"
              />
              <Text fontSize={26}>{pdx}</Text>
              <ActiveButton
                w={8}
                h={8}
                onPress={() => {
                  setPdx(pdx - 5);
                }}
                name="minus"
              />
            </HStack>
            {/* <Slider
              defaultValue={4}
              minValue={0}
              maxValue={16}
              accessibilityLabel="hello world"
              step={1}
              onChangeEnd={(v) => {
                v && setPdx(v);
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Divider
              mt={4}
              _light={{ bg: "myColors.light30" }}
              _dark={{ bg: "myColors.dark30" }}
            /> */}
            <Text fontSize={20}>Padding (上下)</Text>
            <HStack justifyContent={"space-between"} alignItems="center">
              <ActiveButton
                w={8}
                h={8}
                onPress={() => {
                  setPdx(pdx + 5);
                }}
                name="plus"
              />
              <Text fontSize={26}>{pdx}</Text>
              <ActiveButton
                w={8}
                h={8}
                onPress={() => {
                  setPdx(pdx - 5);
                }}
                name="minus"
              />
            </HStack>
            {/* <Slider
              defaultValue={4}
              minValue={0}
              maxValue={16}
              accessibilityLabel="hello world"
              step={1}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider> */}
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

  React.useEffect(() => {
    FileSystem.readAsStringAsync(route.params.book.uri)
      .then((result) => setContent(result))
      .catch(() => {
        setContent(
          "觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。舍利子，色不異空，空不異色；色即是空，空即是色。受、想、行、識，亦復如是。舍利子，是諸法空相，不生不滅，不垢不淨，不增不減，是故空中無色，無受、想、行、識；無眼、耳、鼻、舌、身、意；無色、聲、香、味、觸、法；無眼界，乃至無意識界；無無明，亦無無明盡；乃至無老死，亦無老死盡。無苦、集、滅、道，無智亦無得，以無所得故。菩提薩埵，依般若波羅蜜多故，心無罣礙。無罣礙故，無有恐怖，遠離顛倒夢想，究竟涅槃。三世諸佛，依般若波羅蜜多故，得阿耨多羅三藐三菩提。故知般若波羅蜜多，是大神咒，是大明咒，是無上咒，是無等等咒，能除一切苦，真實不虛。故說般若波羅蜜多咒，即說咒曰：「揭諦、揭諦，波羅揭諦，波羅僧揭諦，菩提薩婆訶。」觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。舍利子，色不異空，空不異色；色即是空，空即是色。受、想、行、識，亦復如是。舍利子，是諸法空相，不生不滅，不垢不淨，不增不減，是故空中無色，無受、想、行、識；無眼、耳、鼻、舌、身、意；無色、聲、香、味、觸、法；無眼界，乃至無意識界；無無明，亦無無明盡；乃至無老死，亦無老死盡。無苦、集、滅、道，無智亦無得，以無所得故。菩提薩埵，依般若波羅蜜多故，心無罣礙。無罣礙故，無有恐怖，遠離顛倒夢想，究竟涅槃。三世諸佛，依般若波羅蜜多故，得阿耨多羅三藐三菩提。故知般若波羅蜜多，是大神咒，是大明咒，是無上咒，是無等等咒，能除一切苦，真實不虛。故說般若波羅蜜多咒，即說咒曰：「揭諦、揭諦，波羅揭諦，波羅僧揭諦，菩提薩婆訶。」"
        );
        toast.show({
          description: "faild to load target file, read example file instead.",
          bg: "danger.500",
        });
      });
  }, []);

  return (
    <Box
      safeArea={true}
      flex={1}
      _light={{ bg: "myColors.light60" }}
      _dark={{ bg: "myColors.dark60" }}
    >
      <Box flex={1} alignItems="center">
        <ScrollView px={`${pdx}px`}>
          <Pressable
            onPress={() => {
              setOverlay(!showOverlay);
              setOverlayMenuIndex(0);
            }}
          >
            <Divider
              mt={4}
              _light={{ bg: "myColors.light60" }}
              _dark={{ bg: "myColors.dark60" }}
            />

            <Text fontSize={24}>{content}</Text>
            <Divider
              mt={8}
              _light={{ bg: "myColors.light60" }}
              _dark={{ bg: "myColors.dark60" }}
            />
          </Pressable>
        </ScrollView>
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
          <VStack bottom={0} position="absolute" width="100%">
            <HStack
              justifyContent="center"
              px={2}
              _light={{ bg: "myColors.light30" }}
              _dark={{ bg: "myColors.dark30" }}
            >
              <OverlayMenu />
            </HStack>
            <HStack
              px={2}
              _light={{ bg: "myColors.light30" }}
              _dark={{ bg: "myColors.dark30" }}
            >
              <Button
                flex={1}
                onPress={() => setOverlayMenuIndex(1)}
                colorScheme="myButton"
              >
                <Text fontSize={28}>目錄</Text>
              </Button>
              <Button
                flex={1}
                onPress={() => setOverlayMenuIndex(2)}
                colorScheme="myButton"
              >
                <Text fontSize={28}>版面</Text>
              </Button>
              <Button
                flex={1}
                onPress={() => setOverlayMenuIndex(3)}
                colorScheme="myButton"
              >
                <Text fontSize={28}>顏色</Text>
              </Button>
              <Button
                flex={1}
                onPress={() => setOverlayMenuIndex(4)}
                colorScheme="myButton"
              >
                <Text fontSize={28}>書籤</Text>
              </Button>
              <Button
                flex={1}
                onPress={() => setOverlayMenuIndex(5)}
                colorScheme="myButton"
              >
                <Icon
                  as={MaterialCommunityIcons}
                  name="dots-horizontal"
                  size={12}
                />
              </Button>
            </HStack>
          </VStack>
        ) : null}
      </Box>
    </Box>
  );
}
