import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  clearLabel: string;
};

export function CargoFilters({
  search,
  onSearchChange,
  onClear,
  placeholder,
  clearLabel,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="md:max-w-md"
        />

        <Button variant="outline" onClick={onClear}>
          {clearLabel}
        </Button>
      </div>
    </div>
  );
}
