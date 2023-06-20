import { Link } from "@remix-run/react";
import { Button } from "./Button";

type ModalProps = {
  show: boolean;
  handleClose: () => void;
  text: string;
};

export const Modal = ({ show, handleClose, text }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-full  overflow-x-hidden overflow-y-auto h-full max-h-full bg-slate-500/75">
      <section className="relative w-full max-w-2xl max-h-full top-[30%] left-1/3 ">
        <div className="relative bg-white rounded-lg shadow p-6 w-full flex flex-col gap-4">
          <button
            className="self-end bg-slate-400 text-2xl rounded-full text-white w-8 h-8 hover:bg-slate-200"
            type="button"
            onClick={handleClose}
          >
            X
          </button>
          <h3 className="text-2xl font-semibold">You are logged out</h3>
          <p>{text}</p>

          <div className="flex justify-center gap-6">
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
