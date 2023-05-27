type ButtonProps = {
  theme: "dark" | "light";
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
};

export const Button = ({ type, text, theme, onClick }: ButtonProps) => {
  const classname = `flex items-center justify-center rounded px-4 py-2 h-full w-full ${
    theme === "light"
      ? "bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
      : "bg-slate-400 px-4 py-2 font-medium text-white hover:bg-cyan-600"
  }`;

  return (
    <button type={type} className={classname} onClick={onClick}>
      {text}
    </button>
  );
};
