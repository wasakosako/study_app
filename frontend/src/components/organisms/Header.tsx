import { Avatar, Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { FC, memo } from "react";
import { MainTab } from "../molecules/tabs/mainTab";
import { HeaderProps } from "../type/organisms";

export const Header: FC<HeaderProps> = memo((props) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  return (
    <>
      <Flex
        alignItems="center"
        p={4}
        bg="gray.100"
        borderRadius="md"
        left={isLargerThanMd ? "250px" : "0"}
      >
        <Avatar
          size={{ base: "lg", md: "400px" }}
          name="Your Name"
          src={props.profileImg}
        />
        <Box ml={4}>
          {/* 名前 */}
          <Text fontWeight="bold" fontSize="lg">
            {props.username}
          </Text>
          {/* Bio */}
          <Text fontSize="sm" color="gray.600">
            {props.profile}
          </Text>
        </Box>
      </Flex>
      <MainTab one="タイムライン" two="レポート" three="プロフィール" />
    </>
  );
});
