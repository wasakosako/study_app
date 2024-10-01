import { Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { GetAllStudyCards } from "../../hooks/useStudyCards";
import { StudyCards } from "../organisms/StudyCards";

export const Record = () => {
  const { studyCards, GetStudyCards, error, loading } = GetAllStudyCards();

  useEffect(() => GetStudyCards, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>データの取得に失敗しました</p>
      ) : (
        <>
          <Text fontSize="xl" fontStyle="bold">
            記録する
          </Text>
          <StudyCards cards={studyCards} />
        </>
      )}
    </>
  );
};
