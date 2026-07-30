import { categories } from "@/data/categories";
import CategoryIcon from "./CategoryIcon";

const CategorySelect = ({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) => {
  return (
    <section className="flex flex-col text-center animate-fade-in">
      <h2 className="m-0 font-display text-[34px] font-medium leading-tight text-starlight max-[520px]:text-[26px]">
        Ten stars are waiting.
        <br />
        <em className="not-italic text-ember">Which sky will you chart?</em>
      </h2>
      <p className="mt-3 text-fog">
        Answer well and your constellation burns gold. Miss, and a star stays
        dark.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3.5 max-[460px]:grid-cols-1">
        {categories.map((category, i) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.name)}
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-starlight/12 bg-starlight/3 px-4 py-6 backdrop-blur-sm transition duration-300 animate-drift-in hover:-translate-y-[3px] hover:border-ember/60 hover:bg-ember/5 hover:shadow-[0_0_40px_-8px_var(--color-ember)] focus-visible:border-ember/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          >
            <span className="grid h-[46px] w-[46px] place-content-center text-ember">
              <CategoryIcon name={category.icon} className="h-[26px] w-[26px]" />
            </span>
            <span className="font-display text-[13px] font-light uppercase tracking-[0.12em] text-starlight">
              {category.name}
            </span>
            <span className="text-[9.5px] font-normal uppercase tracking-[0.3em] text-fog">
              10 stars
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySelect;
