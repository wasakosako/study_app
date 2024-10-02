import { Box, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { UseLikeButton } from "../../hooks/useLikeButton";
import { LikeProps } from "../../type/atom";

const debugLike: LikeProps = {
  number: 1,
  status: false,
};
export const LikeButton = (props: LikeProps) => {
  const { LikeCount, LikeStatus, onClick } = UseLikeButton(debugLike);

  return LikeStatus ? (
    <Box>
      <WrapItem>
        <Button onClick={onClick}>
          <FcLike />
        </Button>
      </WrapItem>
      <WrapItem>{LikeCount}</WrapItem>
    </Box>
  ) : (
    <Wrap>
      <WrapItem>
        <Button onClick={onClick}>
          <FcLikePlaceholder />
        </Button>
      </WrapItem>
      <WrapItem>{LikeCount}</WrapItem>
    </Wrap>
  );
};
