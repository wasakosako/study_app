import { useCallback, useState } from "react";

type LikeProps = {
  number: number;
  status: boolean;
};

//イイねボタン
export const UseLikeButton = (props: LikeProps) => {
  const { number, status } = props;
  const [LikeCount, setLikeCount] = useState<number>(number);
  const [LikeStatus, setLikeStatus] = useState(status);

  const onClick = useCallback(() => {
    if (LikeStatus === false) {
      setLikeCount((count) => count + 1);
    } else {
      setLikeCount((count) => count - 1);
    }
    setLikeStatus((ste) => !ste);
  }, [LikeStatus]);
  return { onClick, LikeCount, LikeStatus };
};
