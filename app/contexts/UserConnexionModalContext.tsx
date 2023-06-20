import { createContext, useContext, useState } from "react";
import { Modal } from "~/components/Modal";

type UserConnexionModalContextType = {
  setShowModal: (show: boolean) => void;
};

const UserConnexionModalContext = createContext(
  {} as UserConnexionModalContextType
);

export const useUserConnexionModalContext = () => useContext(
  UserConnexionModalContext
);

export const UserConnexionModalContextProvider = ({ children }: any) => {
  const [showModal, setShowModal] = useState(false);

  console.log("test")

  return (
    <UserConnexionModalContext.Provider value={{ setShowModal }}>
      {children}
      <Modal show={showModal} handleClose={() => setShowModal(false)} title="Créer un compte" />
    </UserConnexionModalContext.Provider>
  );
};
