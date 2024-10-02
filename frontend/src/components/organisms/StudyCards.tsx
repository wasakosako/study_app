import {
  Box,
  Center,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import { FaBook } from "react-icons/fa6";
import { StudyModal } from "./StudyModal";
import { StudyCardsProps } from "../../type/organisms";

export const StudyCards: FC<StudyCardsProps> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Wrap>
        <Wrap spacing="30px" p={{ base: 4, md: 10 }}>
          {props.cards.map((cards) => (
            <WrapItem onClick={onOpen}>
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
                    {cards._id}
                  </Text>
                </Stack>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Wrap>
      <StudyModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        SubjectTitle="国語"
      />
    </>
  );
});
