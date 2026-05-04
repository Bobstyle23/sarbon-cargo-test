import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
};

export function CargoFilters({ search, onSearchChange, onClear }: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          placeholder="Cargo nomi, shahar yoki kontakt bo‘yicha qidirish..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:max-w-md"
        />

        <Button variant="outline" onClick={onClear}>
          Tozalash
        </Button>
      </div>
    </div>
  );
}
