import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaBook } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { registStudyProps } from "../../type/atom";

export const Temp = () => {
  const navigate = useNavigate();
  //登録する本の勉強中、完了切り替えフラグ
  const [studyflag, setStudyFlag] = useState<Boolean>();
  const toast = useToast();
  const onSubmit = () => async (data: registStudyProps) => {
    axios
      .post("/proxy/api/regist/subject", data)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "登録が成功しました.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/Record");
        } else {
          toast({
            title: "登録が失敗しました.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "登録が失敗しました.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });

    return (
      <>
        <form onSubmit={onSubmit}>
          <Flex mx={{ base: 4, md: 20 }} mb={5}>
            <Box>
              <FaBook size={70} />
            </Box>
            <Box flex={1}>
              <FormControl>
                <Input placeholder="教材名を入力" my={4} ml={4} />
              </FormControl>
            </Box>
          </Flex>
          <Box textAlign="right" mr={{ base: 0, md: 20 }}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                勉強中
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setStudyFlag(false)}>勉強中</MenuItem>
                <MenuItem onClick={() => setStudyFlag(true)}>完了</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Flex mx={{ base: 4, md: 20 }} mb={5}>
            <FormControl>
              <FormLabel>優先度を入力</FormLabel>
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="blue" value="0" size="lg">
                    優先度:低
                  </Radio>
                  <Radio colorScheme="gray" value="3" size="lg">
                    優先度:中
                  </Radio>
                  <Radio colorScheme="red" value="5" size="lg">
                    優先度:高
                  </Radio>
                </Stack>
              </RadioGroup>
              <Center mt={10}>
                <Button type="submit" size="lg">
                  教材を登録
                </Button>
              </Center>
            </FormControl>
          </Flex>
        </form>
      </>
    );
  };
};
