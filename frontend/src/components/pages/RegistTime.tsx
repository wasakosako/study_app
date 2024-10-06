import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
type RegistTimeProps = {
  Img?: string;
};

type timeprops = {
  time: number;
};

export const RegistTime = (props: RegistTimeProps) => {
  const [sliderValue, setSliderValue] = useState(50);
  const { subname } = useParams();
  console.log(subname);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<timeprops>({ defaultValues: { time: 50 } });
  const { Img } = props;

  useEffect(() => {
    // 初期値をフォームに設定
    setValue("time", sliderValue);
  }, [setValue, sliderValue]);

  const onClick = (value: timeprops) => {
    console.log(value);
    axios
      .get(`/proxy/directregisttime/${subname}`, {
        params: {
          time: value.time,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ margin: "0px 200px" }}>
      <Flex>
        <Image
          src={
            Img ||
            "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          }
          alt="subject"
          boxSize={{ base: "100px", sm: "200px" }}
          mb={50}
        />
        <Text ml={20} fontSize={50} mt={10}>
          {subname}
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(onClick)}>
        <FormControl>
          <Text fontSize={20}>時間を入力してください</Text>

          {/* スライドバーの実装部分 */}
          <Box p={4} pt={6}>
            <Slider
              aria-label="slider-ex-6"
              onChange={(val) => {
                setSliderValue(val);
                setValue("time", val);
              }}
            >
              <SliderMark value={25} {...labelStyles}>
                25分
              </SliderMark>
              <SliderMark value={50} {...labelStyles}>
                50分
              </SliderMark>
              <SliderMark value={75} {...labelStyles}>
                75分
              </SliderMark>
              <SliderMark
                value={sliderValue}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {sliderValue}分
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </FormControl>
        <Box textAlign="right">
          <Button type="submit">登録</Button>
        </Box>
      </form>
    </div>
  );
};
