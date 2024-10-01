import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { FC, memo } from "react";
import { SidebarButton } from "../atoms/button/menubutton";
import { DrawerProps } from "../../type/molecules";

export const UserMenu: FC<DrawerProps> = memo((props) => {
  const {
    onClickProfile,
    onClickTimeline,
    onClickRecord,
    onClickReport,
    onClickBack,
    onClose,
    isOpen,
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody>
            <SidebarButton func={onClickProfile} charcter={"プロフィール"} />
            <SidebarButton func={onClickTimeline} charcter={"タイムライン"} />
            <SidebarButton func={onClickRecord} charcter={"記録する"} />
            <SidebarButton func={onClickReport} charcter={"レポート"} />
            <SidebarButton func={onClickBack} charcter={"戻る"} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
