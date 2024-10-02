import { Box, Center, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo } from "react";
import { FaBook } from "react-icons/fa6";
import { StudyCardProps } from "../../../type/atom";

export const StudyCard: FC<StudyCardProps> = memo((props) => {
  return (
    <WrapItem>
      <Box
        p={4}
        w="260px"
        h="260px"
        bg="gray.100"
        borderRadius="10px"
        shadow="md"
        _hover={{ cursor: "pointer", opacity: 0.8 }}
      >
        <Stack textAlign="center" spacing={6} py={4} px={10}>
          <Center>
            <FaBook size="80%" />
          </Center>
          <Text fontSize="lg" fontWeight="bold">
            {props.category_id}
          </Text>
        </Stack>
      </Box>
    </WrapItem>
  );
});
