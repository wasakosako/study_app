import { Box, Flex, Input, Text, Wrap } from "@chakra-ui/react";
import { FaBook } from "react-icons/fa6";

export const Temp = () => {
  return (
    <Flex mx={{ base: 4, md: 20 }}>
      <Box>
        <FaBook size={70} />
      </Box>
      <Box flex={1}>
        <Input placeholder="教材名を入力" my={4} ml={4} />
      </Box>
    </Flex>
  );
};
