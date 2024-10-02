import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Link,
} from "@chakra-ui/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { FC, memo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/userContext";
import { UserProps } from "../../type/atom";

export const Login: FC = memo(() => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit: SubmitHandler<UserProps> = async function usePostId(
    user: UserProps
  ) {
    const { username, password } = user;
    axios
      .post(
        "/proxy/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          console.log(res.data.token);
          login(res.data.token, res.data.userInfo);
          navigate("/Top");
        } else {
          //NG
        }
        console.log(`${res.status}:${res.headers}`);
      })
      .catch((err) => {
        console.error(`[Error] ${err}`);
      });
  };

  const { handleSubmit, register } = useForm<UserProps>();
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="md" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          勉強時間を管理するアプリ
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} py={4} px={10}>
            <Input
              placeholder="ユーザーネーム"
              {...register("username", {
                required: "ユーザーネームを入力してください",
              })}
            />
            <Input
              type="password"
              placeholder="パスワード"
              {...register("password", {
                required: "パスワードを入力してください",
              })}
            />
          </Stack>
          <Center>
            <Button mt={4} colorScheme="teal" type="submit">
              ログイン
            </Button>
          </Center>
          <Center mt={4}>
            <Link href="./register" color="blue">
              新規登録はこちら
            </Link>
          </Center>
        </form>
      </Box>
    </Flex>
  );
});
