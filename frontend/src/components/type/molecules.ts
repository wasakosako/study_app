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

export type NeedforStudy = {
  SubjectTitle: string;
  Img?: string;
};

export type StudyModalFooterProps = {
  modalclose: () => void;
  ButtonAction: () => void;
};
