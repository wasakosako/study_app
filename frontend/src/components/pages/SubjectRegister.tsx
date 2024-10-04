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
import { FaBook } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { DecodedToken, registStudyProps } from "../../type/atom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const SubjectRegister = () => {
  const { handleSubmit, register, setValue } = useForm<registStudyProps>({
    defaultValues: {
      status: false,
      priority: 1,
      name: "",
    },
  });
  const navigate = useNavigate();
  const toast = useToast();
  const onSubmit = (data: registStudyProps) => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken !== null) {
      // jwtDecodeでデコードされたトークンを取得
      const decodedToken = jwtDecode<DecodedToken>(jwtToken); // 型アサーションを使用
      console.log("Decoded JWT:", decodedToken); // デコードされたトークンの構造を確認

      // デコードされたトークンからusernameを取り出してuser_idに設定
      if (
        decodedToken &&
        typeof decodedToken === "object" &&
        "username" in decodedToken
      ) {
        data["username"] = decodedToken.username.toString();
      } else {
        toast({
          title: "ログインしてください.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return navigate("/");
      }
      console.log(data);
      //axiosでデータを送信
      //     実例:[0] {
      //   status: false,
      //    priority: 0,
      //    name: 'aaaaaaaaaaa',
      //    user_id: { username: 'e120202', iat: 1727993056, exp: 1728079456 }
      //  }
      //  このような形でデータが送信される。
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
            navigate("/Top/Record");
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mx={{ base: 4, md: 20 }} mb={5}>
          <Box>
            <FaBook size={70} />
          </Box>
          <Box flex={1}>
            <FormControl>
              <Input
                placeholder="教材名を入力"
                my={4}
                ml={4}
                {...register("name", {
                  required: "教材名を入力してください",
                })}
              />
            </FormControl>
          </Box>
        </Flex>
        <Box textAlign="right" mr={{ base: 0, md: 20 }}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              勉強中
            </MenuButton>
            <MenuList
              onChange={(value) => {
                setValue("status", false);
              }}
            >
              <MenuItem value="0">勉強中</MenuItem>
              <MenuItem value="1">完了</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Flex mx={{ base: 4, md: 20 }} mb={5}>
          <FormControl>
            <FormLabel>優先度を入力</FormLabel>
            <RadioGroup
              onChange={(value) => {
                setValue("priority", parseInt(value));
              }}
            >
              <Stack spacing={5} direction="row">
                <Radio value="0" size="lg">
                  優先度:低
                </Radio>
                <Radio colorScheme="gray" value="1" size="lg">
                  優先度:中
                </Radio>
                <Radio colorScheme="red" value="2" size="lg">
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
