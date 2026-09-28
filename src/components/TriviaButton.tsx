import { MouseEvent } from "react";

const VARIANTS = {
  primary:
    "border-ink bg-sun text-ink shadow-[0_3px_0_var(--color-ink)] hover:-translate-y-px hover:shadow-[0_4px_0_var(--color-ink)] active:translate-y-0.5 active:shadow-[0_1px_0_var(--color-ink)] focus-visible:outline-card",
  ink: "border-ink bg-transparent text-ink hover:bg-ink/5 focus-visible:outline-ink",
  quiet:
    "border-card/70 bg-transparent text-card hover:border-card hover:bg-card/10 focus-visible:outline-sun",
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
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center rounded-full border-2 px-[22px] py-2.5 font-display text-sm uppercase tracking-[0.08em] transition duration-150 focus-visible:outline-[3px] focus-visible:outline-offset-2 ${VARIANTS[variant]}`}
      onClick={handleButton}
    >
      {buttonText}
    </button>
  );
};

export default TriviaButton;
