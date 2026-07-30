import { MouseEvent } from "react";

const VARIANTS = {
  primary:
    "border border-ember/50 bg-ember/5 text-ember hover:bg-ember/15 hover:shadow-[0_0_30px_-4px_var(--color-ember)]",
  quiet:
    "border border-fog/40 bg-transparent text-fog hover:text-starlight hover:border-fog",
} as const;

const TriviaButton = ({
  handleButton,
  buttonText,
  variant = "primary",
}: {
  handleButton?: (b: MouseEvent) => void;
  buttonText: string;
  variant?: keyof typeof VARIANTS;
}) => {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center rounded-full px-9 py-4 font-display text-xs font-light uppercase tracking-[0.34em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${VARIANTS[variant]}`}
      onClick={handleButton}
    >
      {buttonText}
    </button>
  );
};

export default TriviaButton;
