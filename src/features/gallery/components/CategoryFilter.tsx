interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const base =
    "border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`${base} ${
          selected === null
            ? "border-gold bg-gold/10 text-gold"
            : "border-white/10 text-white/60 hover:border-gold/40"
        }`}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className={`${base} ${
            selected === category
              ? "border-gold bg-gold/10 text-gold"
              : "border-white/10 text-white/60 hover:border-gold/40"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
