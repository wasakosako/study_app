import axios from "axios";
import { StudyCardProps } from "../type/atom";
import { useCallback, useState } from "react";

export const GetAllStudyCards = () => {
  const [studyCards, setStudyCards] = useState<Array<StudyCardProps>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const GetStudyCards = useCallback(() => {
    setLoading(true);
    setError(false);
    axios
      .get<Array<StudyCardProps>>("/studydata.json")
      .then((res) => {
        const data = res.data.map(
          (subject): StudyCardProps => ({
            _id: subject._id,
            user_id: subject.user_id,
            category_id: subject.category_id,
            start_time: subject.start_time,
            end_time: subject.end_time,
          })
        );
        setStudyCards(data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { studyCards, GetStudyCards, error, loading };
};
