import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  func: () => void;
  charcter?: String;
};

export const SidebarButton: FC<Props> = memo((props) => {
  const { func, charcter } = props;
  return (
    <Button onClick={func} w="100%" bg="transparent">
      {charcter != null ? charcter : ""}
    </Button>
  );
});
