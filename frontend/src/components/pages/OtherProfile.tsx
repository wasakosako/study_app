import { useEffect, useState } from "react";

import { TimeCard } from "../atoms/Card/Card";
import { Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CardProps } from "../type/atom";

export const OtherProfile = () => {
  const { username } = useParams();
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get<Array<CardProps>>(`/proxy/api/profile/${username}`)
      .then((res) => {
        const data = res.data.map((data) => ({
          username: data.username,
          content: data.content,
          Like: data.Like,
          status: data.status,
        }));
        setCards(data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {error ? (
        <p>データの取得に失敗しました</p>
      ) : loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          {cards.map((user) => (
            <TimeCard
              username={user.username}
              content={user.content}
              Like={user.Like}
              status={user.status}
            />
          ))}
        </>
      )}
    </>
  );
};
