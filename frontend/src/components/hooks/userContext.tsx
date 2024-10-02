import { FC, ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import { UserProps } from "../src/type/atom";

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

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
