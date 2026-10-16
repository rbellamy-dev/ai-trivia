import { forwardRef, type MouseEvent } from "react";

const VARIANTS = {
  primary: "border-ink bg-ink text-card hover:bg-ink/85",
  quiet: "border-edge bg-card text-ink hover:border-ink",
} as const;

const TriviaButton = forwardRef<
  HTMLButtonElement,
  {
    handleButton?: (b: MouseEvent) => void;
    buttonText: string;
    variant?: keyof typeof VARIANTS;
    /** Stays focusable (aria-disabled, not disabled) so focus isn't lost. */
    busy?: boolean;
  }
>(({ handleButton, buttonText, variant = "primary", busy = false }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      aria-disabled={busy || undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-[0.9375rem] font-medium transition-colors duration-150 ${VARIANTS[variant]} ${
        busy ? "cursor-progress" : "cursor-pointer"
      }`}
      onClick={busy ? undefined : handleButton}
    >
      {buttonText}
      {/* Busy: the label stays at full contrast; three dots carry the motion. */}
      {busy && (
        <span aria-hidden="true" className="ml-2.5 inline-flex gap-1">
          {[0, 1, 2].map((i) => (
            <i
              key={i}
              className="block size-1.5 rounded-full bg-current animate-pulse-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
      )}
    </button>
  );
});
TriviaButton.displayName = "TriviaButton";

export default TriviaButton;
