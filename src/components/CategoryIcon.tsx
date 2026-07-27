import type { CategoryIconName } from "@/data/categories";

/** Monochrome line-icon set for the category tiles (drawn in currentColor). */
const PATHS: Record<CategoryIconName, React.ReactNode> = {
  flask: (
    <>
      <path d="M10 2v6.3L4.6 18a2.4 2.4 0 0 0 2.1 3.6h10.6a2.4 2.4 0 0 0 2.1-3.6L14 8.3V2" />
      <path d="M8.5 2h7" />
      <path d="M7.3 15h9.4" />
    </>
  ),
  column: (
    <>
      <path d="M3 21h18M4 18h16M6 18V9M10 18V9M14 18V9M18 18V9M3 9h18L12 3 3 9Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.7 2.6 4 5.7 4 9s-1.3 6.4-4 9c-2.7-2.6-4-5.7-4-9s1.3-6.4 4-9Z" />
    </>
  ),
  note: (
    <>
      <circle cx="6.5" cy="17.5" r="3" />
      <circle cx="17.5" cy="14.5" r="3" />
      <path d="M9.5 17.5V6l11-3v11.5" />
    </>
  ),
};

const CategoryIcon = ({
  name,
  className,
}: {
  name: CategoryIconName;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {PATHS[name]}
  </svg>
);

export default CategoryIcon;
