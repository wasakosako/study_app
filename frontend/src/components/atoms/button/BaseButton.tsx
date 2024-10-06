import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";
import { ButtonProps2 } from "../../../type/atom";

export const BaseButton: FC<ButtonProps2> = memo((props) => {
  return (
    <Button color="gary.800" _hover={{ opacity: 0.8 }} onClick={props.onClick}>
      {props.children}
    </Button>
  );
});
