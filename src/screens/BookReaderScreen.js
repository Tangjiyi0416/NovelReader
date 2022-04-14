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
  Spacer,
  Text,
  useToast,
} from "native-base";
import ActiveButton from "../components/ActiveButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

export default function BookReaderScreen({ route, navigation }) {
  const toast = useToast();
  const [content, setContent] = useState("");
  const [showOverlay, setOverlay] = useState(false);
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
        <ScrollView px={4}>
          <Pressable onPress={() => setOverlay(!showOverlay)}>
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
          <HStack
            width="100%"
            justifyContent="space-between"
            px={2}
            bottom={0}
            position="absolute"
            _light={{ bg: "myColors.light30" }}
            _dark={{ bg: "myColors.dark30" }}
          >
            <Button colorScheme="myButton">
              <Text fontSize={28}>目錄</Text>
            </Button>
            <Button colorScheme="myButton">
              <Text fontSize={28}>版面</Text>
            </Button>
            <Button colorScheme="myButton">
              <Text fontSize={28}>顏色</Text>
            </Button>
            <Button colorScheme="myButton">
              <Text fontSize={28}>書籤</Text>
            </Button>
            <Button colorScheme="myButton">
              <Icon
                as={MaterialCommunityIcons}
                name="dots-horizontal"
                size={12}
              />
            </Button>
          </HStack>
        ) : null}
      </Box>
    </Box>
  );
}
