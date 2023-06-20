import { createContext, useContext, useState } from "react";
import { Modal } from "~/components/Modal";

type UserConnexionModalContextType = {
  setShowModal: (show: boolean) => void;
  setText: (text: string) => void;
  setRedirectUrl: (url: string) => void;
  redirectUrl: string;
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

  return (
    <UserConnexionModalContext.Provider
      value={{ setShowModal, setText, setRedirectUrl, redirectUrl }}
    >
      {children}
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        text={text}
      />
    </UserConnexionModalContext.Provider>
  );
};
