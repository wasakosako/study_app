import {
  Box,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { GetAllStudyCards } from "../../hooks/useStudyCards";
import { StudyCards } from "../organisms/StudyCards";
import { FaPen } from "react-icons/fa6";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const Record = () => {
  const { studyCards, GetStudyCards, error, loading } = GetAllStudyCards();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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
              <ModalHeader as="u">科目の追加</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap>
                  <WrapItem mr={4}>
                    <FormControl>
                      <Select placeholder="科目を選択">
                        <option>United Arab Emirates</option>
                        <option>Nigeria</option>
                      </Select>
                    </FormControl>
                  </WrapItem>
                  <WrapItem>
                    <AddIcon
                      boxSize={4}
                      mt={3}
                      cursor="pointer"
                      onClick={() => navigate("/test")}
                    />
                  </WrapItem>
                </Wrap>
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
