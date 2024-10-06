import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { LikeButton } from "../button/LikeButton";
import { CardProps } from "../../../type/atom";

//タイムラインに乗るカードだからタイムカード
//くそわかりずらいから要編集
export const TimeCard: FC<CardProps> = (props) => {
  const { content, ProfileImage, Like, status } = props;
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Stack direction={["column", "row"]} spacing="24px">
        <Avatar
          src={ProfileImage || "/images/default.jpg"}
          size="2xl"
          mt={5}
          ml={5}
        />
        <Box>
          <Stack>
            <Link
              ml={4}
              fontSize="3xl"
              mt={2}
              href={`/profile/${props.username}`}
            >
              <Text textAlign="left">{props.username}</Text>
            </Link>
            <CardBody>{content}</CardBody>

            <CardFooter>
              <LikeButton number={Like} status={status} />
            </CardFooter>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};
