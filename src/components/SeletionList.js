import React from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBookImportData,
  setBookData,
} from "../redux/bookImportDataSlice";
import { addTags } from "../redux/tagsSlice";
export default function SelectionList() {
  const instState = [
    {
      title: "科幻",
      isChecked: false,
    },
    {
      title: "奇幻",
      isChecked: false,
    },
    {
      title: "高優先",
      isChecked: false,
    },
    {
      title: "起點",
      isChecked: false,
    },
    {
      title: "日輕",
      isChecked: false,
    },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const bookData = useSelector(selectBookImportData);
  const addItem = (title) => {
    if (title === "") {
      toast.show({
        title: "Please Enter Text",
        status: "warning",
      });
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isChecked: false,
        },
      ];
    });
  };

  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isChecked = !newList[index].isChecked;
      const tags = newList
        .filter((x) => x.isChecked)
        .map((value) => value.title);
      dispatch(
        setBookData({
          tags: tags,
        })
      );
      //   dispatch(addTags(tags));
      return newList;
    });
  };

  return (
    <Box flex={1}>
      <Text mb="2" fontSize={20}>
        標籤
      </Text>
      <VStack space={4}>
        <HStack space={2}>
          <Input
            flex={1}
            onChangeText={(v) => setInputValue(v)}
            value={inputValue}
            placeholder="Add Tag"
            variant={"underlined"}
            _light={{ borderColor: "myColors.lightText" }}
            _dark={{ borderColor: "myColors.darkText" }}
          />
          <IconButton
            borderRadius="sm"
            variant="solid"
            _dark={{ bgColor: "myColors.dark10" }}
            icon={
              <Icon
                as={Feather}
                name="plus"
                size="sm"
                _light={{ color: "myColors.light30" }}
                _dark={{ color: "myColors.dark30" }}
              />
            }
            onPress={() => {
              addItem(inputValue);
              setInputValue("");
            }}
          />
        </HStack>
        <VStack space={2}>
          {list.map((item, itemI) => (
            <HStack
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              key={item.title + itemI.toString()}
            >
              <Checkbox
                isChecked={item.isChecked}
                onChange={() => handleStatusChange(itemI)}
                value={item.title}
                key={item.title + "c"}
                _checked={{
                  _light: {
                    bgColor: "primary.500",
                  },
                  _dark: {
                    bgColor: "myColors.dark10",
                  },
                }}
              >
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  mx="2"
                  _light={{
                    color: "myColors.lightText",
                  }}
                  _dark={{
                    color: "myColors.darkText",
                  }}
                  onPress={() => handleStatusChange(itemI)}
                >
                  {item.title}
                </Text>
              </Checkbox>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
