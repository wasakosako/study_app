export type DrawerProps = {
  onClose: () => void;
  isOpen: boolean;
  onClickProfile: () => void;
  onClickTimeline: () => void;
  onClickRecord: () => void;
  onClickReport: () => void;
  onClickBack: () => void;
};

export type ModalProps = {
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
};

export type studymodalplus = {
  subjectTitle: string;
};

export type NeedforStudy = {
  SubjectTitle: string;
  Img?: string;
};

export type StudyModalFooterProps = {
  modalclose: () => void;
  ButtonAction: () => void;
};

export type StudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  SubjectTitle: string | undefined;
  Img?: string;
};
