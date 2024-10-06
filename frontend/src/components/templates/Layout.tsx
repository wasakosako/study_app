import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";
import { Sidebar } from "../organisms/SideBar";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../organisms/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { HeaderProps } from "../../type/organisms";
import { jwtDecode } from "jwt-decode";
import { DecodedToken, UserProps } from "../../type/atom";

export const SidebarLayout = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<UserProps>();
  const [user] = useState<DecodedToken>(
    jwtDecode(localStorage.getItem("jwt") || "")
  );
  const [otherInfo, setOtherInfo] = useState<HeaderProps>();
  const [myself, setMyself] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      setMyself(false);
      axios
        .get(`/proxy/api/header/${username}`)
        .then((res) => {
          const data = res.data;
          setOtherInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMyself(true);
      if (localStorage.getItem("jwt") === null) {
        useNavigate()("/");
      }
      axios
        .get<UserProps>(`/proxy/api/header/${user.username}`)
        .then((res) => {
          const data = res.data;
          setUserInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [username, user.username]);

  //記録画面・タイムライン画面ではサイドバーを表示しない
  const hide_header =
    location.pathname !== "/Top/Record" &&
    location.pathname !== "/TimeLine" &&
    location.pathname !== "/test" &&
    !location.pathname.startsWith("/registtime/") &&
    location.pathname !== "/Report";

  const show_sidebar =
    location.pathname === "/Top/Record" ||
    location.pathname === "/TimeLine" ||
    location.pathname === "/Report" ||
    location.pathname === "/test" ||
    location.pathname.startsWith("/registtime/");
  console.log(show_sidebar);
  return (
    <>
      {isLargerThanMd && (
        <Box
          position="fixed"
          top="0"
          left="0"
          h="100vh"
          w="250px"
          bg="gray.200"
        >
          <Sidebar />
        </Box>
      )}
      <Box ml={isLargerThanMd ? "250px" : "0"} mt="60px" p="4">
        {hide_header && (
          <>
            <Header
              profileImg={
                myself
                  ? userInfo?.ImgURL || "/images/default.jpg"
                  : otherInfo?.profileImg || "/images/default.jpg"
              }
              profile={
                myself
                  ? userInfo?.profile || "よろしくお願いいたします。"
                  : otherInfo?.profile || "よろしくお願いいたします。"
              }
              username={
                myself
                  ? userInfo?.username || "よろしくマン"
                  : otherInfo?.username || "よろしくマン"
              }
            />
          </>
        )}
        {show_sidebar ? (
          <>
            <Outlet />
          </>
        ) : (
          <>
            <Tabs>
              <TabList>
                <Tab w="33%">タイムライン</Tab>
                <Tab w="33%">記録</Tab>
                <Tab w="33%">プロフィール</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Outlet />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
    </>
  );
};
