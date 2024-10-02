import { Image } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
  profileURL: string;
};

export const ProfileImage: FC<Props> = memo((props) => {
  console.log(props.profileURL);
  return (
    <div>
      <Image
        src={props.profileURL}
        alt="プロフィール画像"
        borderRadius="full"
        h="250px"
        objectFit="cover" // 画像のアスペクト比を保つ
      />
    </div>
  );
});
