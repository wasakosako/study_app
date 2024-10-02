import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/userContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { token } = useAuth(); // AuthContext からトークンを取得

  useEffect(() => {
    // localStorageにトークンがない場合
    if (!token) {
      const storedToken = localStorage.getItem("jwt");
      if (!storedToken) {
        // ログイン画面にリダイレクト
        navigate("/login");
      }
    }
  }, [token, navigate]);

  // トークンがある場合に子コンポーネントを表示
  return <>{children}</>;
};

export default ProtectedRoute;
