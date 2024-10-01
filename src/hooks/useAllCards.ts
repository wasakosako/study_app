import axios from "axios";
import { useCallback, useState } from "react";
import { CardProps } from "../type/atom";

export const GetAllCards = () => {
  const [cards, setCards] = useState<Array<CardProps>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getCards = useCallback(() => {
    setLoading(true);
    setError(false);
    axios
      .get<Array<CardProps>>("data.json")
      .then((res) => {
        const data = res.data.map(
          (user): CardProps => ({
            username: user.username,
            content: user.content,
            Like: user.Like,
            status: user.status,
          }),
        );
        setCards(data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getCards, cards, loading, error };
};
