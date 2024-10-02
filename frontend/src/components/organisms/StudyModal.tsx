import {
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import { StudyModalFooter } from "../molecules/modal/modalfooter";
import { BaseButton } from "../atoms/button/BaseButton";
import { TimerModal } from "./TimerModal";
import { ModalProps, NeedforStudy } from "../../type/molecules";

export const StudyModal: FC<ModalProps & NeedforStudy> = memo((props) => {
  const {
    isOpen: isTimerOpen,
    onClose: onTimerClose,
    onOpen: onTimerOpen,
  } = useDisclosure();
  const {
    isOpen,
    onClose,
    Img = "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.SubjectTitle}</ModalHeader>
          <BaseButton onClick={onTimerOpen}>計測する</BaseButton>

          <Image
            objectFit="cover"
            m="auto"
            maxW={{ base: "100%", sm: "200px" }}
            src={Img}
            alt="Caffe Latte"
          />
          <ModalCloseButton />
          {/* 勉強時間を追加するaxios通信の実装 */}
          <StudyModalFooter modalclose={onClose} ButtonAction={() => {}} />
        </ModalContent>
      </Modal>
      <TimerModal
        isOpen={isTimerOpen}
        onClose={onTimerClose}
        onOpen={onTimerOpen}
      />
    </>
  );
});
