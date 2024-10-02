import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  onClick: () => void;
};

export const MenuIcon: FC<Props> = memo((props) => {
  return (
    <IconButton
      aria-label="メニュー"
      icon={<HamburgerIcon />}
      variant="unstyled"
      size="md"
      display={{ base: "block", md: "none" }}
      onClick={props.onClick}
    />
  );
});
