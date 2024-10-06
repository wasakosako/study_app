import { jwtDecode } from "jwt-decode";
import { DecodedToken, registStudyProps } from "../../type/atom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const onSubmit = async (data: registStudyProps) => {
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("jwt");
  const toast = useToast();
  if (jwtToken !== null) {
    // jwtDecodeでデコードされたトークンを取得
    const decodedToken = jwtDecode<DecodedToken>(jwtToken); // 型アサーションを使用
    console.log("Decoded JWT:", decodedToken); // デコードされたトークンの構造を確認

    // デコードされたトークンからusernameを取り出してuser_idに設定
    if (
      decodedToken &&
      typeof decodedToken === "object" &&
      "username" in decodedToken
    ) {
      data["username"] = decodedToken.username.toString();
    } else {
      toast({
        title: "ログインしてください.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return navigate("/");
    }
    console.log(data);
    //axiosでデータを送信
    //     実例:[0] {
    //   status: false,
    //    priority: 0,
    //    name: 'aaaaaaaaaaa',
    //    user_id: { username: 'e120202', iat: 1727993056, exp: 1728079456 }
    //  }
    //  このような形でデータが送信される。
    axios
      .post("/proxy/api/regist/subject", data)
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "登録が成功しました.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/Top/Record");
        } else {
          toast({
            title: "登録が失敗しました.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "登録が失敗しました.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }
};
