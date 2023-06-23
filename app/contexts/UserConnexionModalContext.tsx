import { createContext, useContext, useState } from "react";
import { Modal } from "~/components/Modal";

type UserConnexionModalContextType = {
  handleOpenModal: (
    redirectUrl: string,
    text: string,
    triggerAction: boolean
  ) => void;
  redirectUrl: string;
  triggerAction: boolean;
  setTriggerAction: (triggerAction: boolean) => void;
};

const UserConnexionModalContext = createContext(
  {} as UserConnexionModalContextType
);

export const useUserConnexionModalContext = () =>
  useContext(UserConnexionModalContext);

export const UserConnexionModalContextProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("Connectez-vous ou créer un compte");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [triggerAction, setTriggerAction] = useState(false);

  const handleOpenModal = (redirectUrl: string, text: string, triggerAction: boolean) => {
    setRedirectUrl(redirectUrl);
    setText(text);
    setTriggerAction(triggerAction)
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    setTriggerAction(false);
  }

  return (
    <UserConnexionModalContext.Provider
      value={{ handleOpenModal, redirectUrl, triggerAction, setTriggerAction }}
    >
      {children}
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        text={text}
        onModalClose={onModalClose}
      />
    </UserConnexionModalContext.Provider>
  );
};
