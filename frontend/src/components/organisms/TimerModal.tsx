import {
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { BaseButton } from "../atoms/button/BaseButton";
import { FC, useEffect, useState } from "react";
import { StudyModalProps } from "../../type/molecules";
import axios from "axios";

export const TimerModal: FC<StudyModalProps> = (props) => {
  const [startFlag, setStartFlag] = useState(false);
  const [minute, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [studyminutes, setStudyminutes] = useState(0);
  const [studyseconds, setStudyseconds] = useState(0);

  // タイマーの処理
  useEffect(() => {
    let minuteInterval: NodeJS.Timeout;
    let secondsInterval: NodeJS.Timeout;

    if (startFlag) {
      // 1分ごとに減少
      minuteInterval = setInterval(() => {
        setMinute((prevMinute) => (prevMinute > 0 ? prevMinute - 1 : 0));
      }, 60000);

      // 1秒ごとに減少
      secondsInterval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0 && minute > 0) {
            // 秒が0になったら、分を1減らし、秒を59にリセット
            setMinute((prevMinute) => prevMinute - 1);
            return 59;
          }
          return prevSeconds > 0 ? prevSeconds - 1 : 0;
        });
      }, 1000);
    }

    return () => {
      clearInterval(minuteInterval);
      clearInterval(secondsInterval);
    };
  }, [startFlag, minute]);

  // minuteとsecondsが変わるたびにstudyminutesとstudysecondsを更新
  useEffect(() => {
    if (startFlag) {
      setStudyminutes((prevStudyMinutes) => prevStudyMinutes + 1 - 1);
    }
  }, [minute]);

  useEffect(() => {
    if (startFlag) {
      setStudyseconds((prevStudySeconds) => prevStudySeconds + 1);
    }
  }, [seconds]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タイマーの選択</ModalHeader>
        <Center>
          <Text fontSize="100px">
            {minute}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </Center>
        <BaseButton
          onClick={() => {
            setMinute(60);
            setSeconds(0);
          }}
        >
          60分
        </BaseButton>
        <BaseButton
          onClick={() => {
            setMinute(25);
            setSeconds(0);
          }}
        >
          25分
        </BaseButton>
        <BaseButton
          onClick={() => {
            setMinute(10);
            setSeconds(0);
          }}
        >
          10分
        </BaseButton>
        <BaseButton onClick={() => setStartFlag(true)}>スタート</BaseButton>
        <BaseButton onClick={() => setStartFlag(false)}>ストップ</BaseButton>
        <BaseButton
          onClick={() => {
            axios
              .post("/proxy/api/regist/timer", {
                subjectname: props.SubjectTitle,
                studyminutes,
                studyseconds,
              })
              .then((res) => {
                if (res.status === 200) {
                  alert("記録が成功しました");
                } else {
                  alert("記録が失敗しました");
                }
              });
          }}
        >
          記録する
        </BaseButton>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
