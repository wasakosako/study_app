import { CardProps } from "@chakra-ui/react";
import { StudyCardProps } from "./atom";

export type CardsProps = {
  cards: Array<CardProps>;
};

export type StudyCardsProps = {
  cards: Array<StudyCardProps>;
};

export type HeaderProps = {
  profileImg?: string;
  username: string;
  profile: string;
};

export type StudyHookProps = {
  studyCards: Array<StudyCardProps>;
  GetStudyCards: () => void;
  error: boolean;
  loading: boolean;
};
