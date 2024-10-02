import { useEffect } from "react";

import { TimeCard } from "../atoms/Card/Card";
import { Center, Spinner } from "@chakra-ui/react";
import { GetAllCards } from "../hooks/useAllCards";

export const Top = () => {
  const { getCards, loading, cards, error } = GetAllCards();

  useEffect(() => getCards, []);

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
