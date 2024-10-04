import axios from "axios";
import { useCallback, useState } from "react";
import { DecodedToken, StudyCardProps } from "../type/atom";
import { useAuth } from "./userContext";
import { jwtDecode } from "jwt-decode";

export const GetAllStudyCards = () => {
  const [studyCards, setStudyCards] = useState<Array<StudyCardProps>>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const GetStudyCards = useCallback(() => {
    setLoading(true);
    setError(false);
    const jwtusername = localStorage.getItem("jwt");
    if (jwtusername === null) return;
    const decodedtoken = jwtDecode<DecodedToken>(jwtusername);
    console.log(decodedtoken.username);
    axios
      .get<Array<StudyCardProps>>(
        `/proxy/api/fetch/subject/${decodedtoken.username}`
      )
      .then((res) => {
        const data = res.data.map(
          (subject): StudyCardProps => ({
            name: subject.name,
            username: subject.username,
            status: subject.status,
            priority: subject.priority,
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
