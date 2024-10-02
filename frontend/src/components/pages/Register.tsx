import {
  Button,
  Input,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserProps } from "../../type/atom";

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserProps>();

  const onSubmit = (data: UserProps) => {
    axios.post("/proxy/register", data);
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "16px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        登録ページ
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              placeholder="メールアドレス"
              {...register("email", {
                required: "メールアドレスを入力してください",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.username}>
            <FormLabel>ユーザーネーム</FormLabel>
            <Input
              placeholder="ユーザーネーム"
              {...register("username", {
                required: "ユーザーネームを入力してください",
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              placeholder="パスワード"
              {...register("password", {
                required: "パスワードを入力してください",
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" width="full">
            登録
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
