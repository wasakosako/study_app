import { Box, Button, Flex } from "@chakra-ui/react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { UseLikeButton } from "../../../hooks/useLikeButton";
import { LikeProps } from "../../../type/atom";

const debugLike: LikeProps = {
  number: 1,
  status: false,
};

export const LikeButton = (props: LikeProps) => {
  const { LikeCount, LikeStatus, onClick } = UseLikeButton(debugLike);

  return (
    <Flex alignItems="center">
      <Button onClick={onClick}>
        {LikeStatus ? <FcLike /> : <FcLikePlaceholder />}
      </Button>
      <Box ml={2}>{LikeCount}</Box>
    </Flex>
  );
};
