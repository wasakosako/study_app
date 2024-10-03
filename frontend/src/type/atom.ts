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
  _id: string;
  user_id: string;
  category_id: string;
  start_time: Date;
  end_time: Date;
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
  name: string;
  status: boolean;
  priority: number;
};
