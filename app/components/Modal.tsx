import { Link } from "@remix-run/react";
import { Button } from "./Button";

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  title: string;
};

export const Modal = ({ show, handleClose, title }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-full p-4 overflow-x-hidden overflow-y-auto h-full max-h-full bg-slate-500/75">
      <section className="relative w-full max-w-2xl max-h-full top-[30%] left-1/3">
        <div className="relative bg-white rounded-lg shadow">
          <button className="close-btn" type="button" onClick={handleClose}>
            X
          </button>
          <h3>{title}</h3>

          <div className="form-actions">
            <Link to="/login">
              <Button
                type="button"
                onClick={handleClose}
                text="Log In"
                theme="dark"
              />
            </Link>
            <Link to="/join">
              <Button
                type="button"
                onClick={handleClose}
                text="Register"
                theme="dark"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
