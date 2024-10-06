import { ReactNode } from "react";

export type LikeProps = {
  number: number;
  status: boolean;
};

export type CardProps = {
  ProfileImage?: string;
  username: string;
  content: string;
  Like: number;
  status: boolean;
};

export type ButtonProps = {
  content: string;
  onClick?: () => void;
};

export type ButtonProps2 = {
  children: ReactNode;
  onClick?: () => void;
};

export type StudyCardProps = {
  subjectname: string;
  username: string;
  status: boolean;
  priority: number;
};

export type UserProps = {
  email?: string;
  password: string;
  username: string;
  profile?: string;
  ImgURL?: string;
  createdAt?: Date;
};

export type registStudyProps = {
  username: string | null;
  subjectname: string;
  priority: number;
  status?: boolean;
};

export interface DecodedToken {
  username: string;
  iat: number;
  exp: number;
}
