import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";
import { ButtonProps2 } from "../../../type/atom";

export const BaseButton: FC<ButtonProps2> = memo((props) => {
  return (
    <Button
      bg="white"
      color="black"
      _hover={{ opacity: 0.8 }}
      border="2px solid"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
});
