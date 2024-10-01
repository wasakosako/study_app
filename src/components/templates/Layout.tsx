import { Box, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "../organisms/SideBar";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../organisms/Header";
import { useAuth } from "../../hooks/userContext";
import { useEffect, useState } from "react";
import { HeaderProps } from "../../type/organisms";
import axios from "axios";

export const SidebarLayout = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  const location = useLocation();
  const { userInfo } = useAuth();
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
    }
  }, [username]);

  //記録画面・タイムライン画面ではサイドバーを表示しない
  const show_header =
    location.pathname !== "/Top/Record" && location.pathname !== "/TimeLine";

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
        {show_header && (
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
        )}
        <Outlet />
      </Box>
    </>
  );
};
