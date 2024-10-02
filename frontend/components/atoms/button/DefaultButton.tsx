import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";
import { ButtonProps } from "../../../type/atom";

export const DefaultButton: FC<ButtonProps> = memo((props) => {
  return (
    <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }}>
      {props.content}
    </Button>
  );
});
