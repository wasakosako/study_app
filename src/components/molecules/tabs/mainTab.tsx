import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { FC } from "react";

// 将来propsが増えた場合の実装も考える
type Props = {
  one: String;
  two: String;
  three: String;
};

export const MainTab: FC<Props> = (props) => {
  const { one, two, three } = props;
  return (
    <Tabs h="200px">
      <TabList>
        <Tab w="33%">{one}</Tab>
        <Tab w="33%">{two}</Tab>
        <Tab w="33%">{three}</Tab>
      </TabList>
    </Tabs>
  );
};
