import { createContext, useContext, useState, FC, ReactNode } from "react";
import { UserProps } from "../type/atom"; // UserPropsのインポート

type AuthProps = {
  token: string | null;
  userInfo: UserProps | undefined;
  logout: () => void;
  login: (token: string, userinfo: UserProps) => void;
};

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );

  const [userInfo, setUserInfo] = useState<UserProps | undefined>();

  const login = (token: string, userInfo: UserProps) => {
    setUserInfo(userInfo);
    setToken(token);
    console.log(token);
    localStorage.setItem("jwt", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuthフックの定義
export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
