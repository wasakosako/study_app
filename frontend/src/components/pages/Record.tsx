import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { GetAllStudyCards } from "../hooks/useStudyCards";
import { StudyCards } from "../organisms/StudyCards";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaPen } from "react-icons/fa6";

export const Record = () => {
  const { studyCards, GetStudyCards, error, loading } = GetAllStudyCards();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => GetStudyCards, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>データの取得に失敗しました</p>
      ) : (
        <>
          <Text fontSize="xl" fontStyle="bold" mb={5}>
            記録する
          </Text>

          <Wrap
            _hover={{
              filter: "brightness(0.7)", // ホバー時に明るさを70%に設定
              transition: "all 0.3s ease", // スムーズなトランジション
            }}
            overflow="hidden"
            cursor="pointer"
            onClick={onOpen}
            backgroundColor={"gray.100"}
            width={"150px"}
            borderRadius={10}
          >
            <Box mt={1} padding="4px">
              <FaPen size={30} />
            </Box>
            <Box>
              <Text fontSize={20} mt={2} ml={2}>
                Add
              </Text>
            </Box>
          </Wrap>
          <StudyCards cards={studyCards} />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>科目の追加</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text></Text>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
