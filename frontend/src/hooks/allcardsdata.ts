import { useState } from "react";

// サンプルデータを生成
const allCardsData = Array.from({ length: 100 }, (_, i) => ({
  username: `User ${i + 1}`,
  content: `This is card content for User ${i + 1}`,
  Like: Math.floor(Math.random() * 100),
  status: i % 2 === 0 ? "active" : "inactive",
}));

// カードデータを取得するフック
export const GetAllCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ページネーション対応の擬似API呼び出し関数
  const getCards = async (page = 0) => {
    setLoading(true);
    setError(null);

    try {
      // 1ページに10件ずつデータを取得
      const pageSize = 10;
      const start = page * pageSize;
      const end = start + pageSize;

      // サンプルデータの一部を切り出して取得
      const newCards = allCardsData.slice(start, end);

      // 新しいデータを既存データに追加
      setCards((prevCards) => [...prevCards, ...newCards]);

      // データが取得できなくなった場合（ページ超過）
      if (newCards.length === 0) {
        setError("データが存在しません");
      }
    } catch (err) {
      setError("データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return { getCards, loading, cards, error };
};
