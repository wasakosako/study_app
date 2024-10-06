import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import { UseFormSetValue } from "react-hook-form";

type RadioProps = {
  setValue: UseFormSetValue<any>;
};

export const RadioGroups: FC<RadioProps> = memo((props) => {
  return (
    <Flex mx={{ base: 4, md: 20 }} mb={5}>
      <FormControl>
        <FormLabel>優先度を入力</FormLabel>
        <RadioGroup
          onChange={(value) => {
            props.setValue("priority", parseInt(value));
          }}
        >
          <Stack spacing={5} direction="row">
            <Radio value="0" size="lg">
              優先度:低
            </Radio>
            <Radio colorScheme="gray" value="1" size="lg">
              優先度:中
            </Radio>
            <Radio colorScheme="red" value="2" size="lg">
              優先度:高
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Flex>
  );
});
