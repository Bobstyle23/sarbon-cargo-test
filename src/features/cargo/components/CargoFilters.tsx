import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  search: string;
  loadingCity: string;
  unloadingCity: string;
  truckType: string;
  onSearchChange: (value: string) => void;
  onLoadingCityChange: (value: string) => void;
  onUnloadingCityChange: (value: string) => void;
  onTruckTypeChange: (value: string) => void;
  onClear: () => void;
};

export function CargoFilters({
  search,
  loadingCity,
  unloadingCity,
  truckType,
  onSearchChange,
  onLoadingCityChange,
  onUnloadingCityChange,
  onTruckTypeChange,
  onClear,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder="Search by cargo, city, contact..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Input
          placeholder="Loading city"
          value={loadingCity}
          onChange={(e) => onLoadingCityChange(e.target.value)}
        />

        <Input
          placeholder="Unloading city"
          value={unloadingCity}
          onChange={(e) => onUnloadingCityChange(e.target.value)}
        />

        <Select
          value={truckType || "all"}
          onValueChange={(value) => {
            onTruckTypeChange(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Truck type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All truck types</SelectItem>
            <SelectItem value="REFRIGERATOR">REFRIGERATOR</SelectItem>
            <SelectItem value="TENT">TENT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 flex justify-end">
        <Button variant="outline" onClick={onClear}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}
