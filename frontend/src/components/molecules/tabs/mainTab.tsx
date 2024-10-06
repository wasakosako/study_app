import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type TabsComponentProps = {
  currentPath: string; // 現在のパスなどの必要なデータを渡す
};

export const TabsComponent = ({ currentPath }: TabsComponentProps) => {
  return (
    <Tabs>
      <TabList>
        <Tab w="33%">タイムライン</Tab>
        <Tab w="33%">記録</Tab>
        <Tab w="33%">プロフィール</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Outlet /> {/* ここでOutletがルーティングに基づいて切り替わる */}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
