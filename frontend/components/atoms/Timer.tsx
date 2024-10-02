import { Center, Text } from "@chakra-ui/react";
import { useState, useEffect, memo } from "react";

type TimerProps = {
  selectedTime?: number;
};

export const Timer = memo((props: TimerProps) => {
  const { selectedTime = 0 } = props;
  const [Minute, setMinute] = useState(selectedTime);
  //分タイマー
  useEffect(() => {
    const minuteinterval = setInterval(() => {
      setMinute((prevTimer) => prevTimer - 1);
    }, 60000); // 1分毎に減少

    // コンポーネントがアンマウントされた時にクリーンアップ
    return () => clearInterval(minuteinterval);
  }, []);
  return (
    <Center fontSize="100px">
      <Text>{`${Minute}`}</Text>
    </Center>
  );
});
