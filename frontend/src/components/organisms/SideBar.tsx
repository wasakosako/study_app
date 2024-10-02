import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserMenu } from "../molecules/MenuDrawer";
import { MenuIcon } from "../atoms/button/MenuIconButton";
import { SidebarButton } from "../atoms/button/menubutton";
import { useAuth } from "../hooks/userContext";

export const Sidebar: FC = memo(() => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  const onClickProfile: () => void = useCallback(() => {
    navigate("/Top");
  }, [navigate]);

  const onClickTimeline = useCallback(() => {
    navigate("/TimeLine");
  }, [navigate]);
  const onClickRecord = useCallback(() => {
    navigate("/Top/Record");
  }, [navigate]);
  const onClickReport = useCallback(() => {
    navigate("/Report");
  }, [navigate]);
  const onClickBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isLargerThanMd ? (
        <Flex h="100vh" position="fixed" display="flex">
          <Box w="250px" bg="white">
            <Flex
              mt="8"
              as="nav"
              w="100%"
              direction="column"
              _hover={{ cursor: "pointer" }}
            >
              <SidebarButton func={onClickProfile} charcter={"プロフィール"} />
              <SidebarButton func={onClickTimeline} charcter={"タイムライン"} />
              <SidebarButton func={onClickRecord} charcter={"記録する"} />
              <SidebarButton func={onClickReport} charcter={"レポート"} />
              <SidebarButton func={onClickBack} charcter={"戻る"} />
              <SidebarButton func={logout} charcter={"ログアウト"} />
            </Flex>
          </Box>
        </Flex>
      ) : (
        <>
          <MenuIcon onClick={onOpen} />
          <UserMenu
            isOpen={isOpen}
            onClose={onClose}
            onClickProfile={onClickProfile}
            onClickTimeline={onClickTimeline}
            onClickRecord={onClickRecord}
            onClickReport={onClickReport}
            onClickBack={onClickBack}
          />
        </>
      )}
    </>
  );
});
