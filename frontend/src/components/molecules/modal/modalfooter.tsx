import { Button, ModalFooter } from "@chakra-ui/react";
import { FC, memo } from "react";
import { StudyModalFooterProps } from "../../../type/molecules";

export const StudyModalFooter: FC<StudyModalFooterProps> = memo((props) => {
  return (
    <ModalFooter>
      <Button variant="ghost" mr={3} onClick={props.modalclose}>
        Close
      </Button>
      <Button colorScheme="blue" onClick={props.ButtonAction}>
        記録する
      </Button>
    </ModalFooter>
  );
});
