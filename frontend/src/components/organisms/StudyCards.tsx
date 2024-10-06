import {
  Box,
  Center,
  Stack,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FC, memo, useState } from "react";
import { FaBook } from "react-icons/fa6";
import { StudyModal } from "./StudyModal";
import { StudyCardsProps } from "../../type/organisms";

export const StudyCards: FC<StudyCardsProps> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardname, setCardname] = useState<string | undefined>(undefined);
  //クリック時に値を渡す
  const handleOpen = (value: string) => {
    setCardname(value);
    onOpen();
  };
  return (
    <>
      <Wrap>
        <Wrap spacing="30px" p={{ base: 4, md: 10 }}>
          {props.cards.map((cards) => (
            <WrapItem onClick={() => handleOpen(cards.subjectname)}>
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
                    {cards.subjectname}
                  </Text>
                </Stack>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Wrap>
      <StudyModal isOpen={isOpen} onClose={onClose} SubjectTitle={cardname} />
    </>
  );
});
