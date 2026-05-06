import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCargoI18n } from "../i18n/CargoI18nContext";

type Props = {
  search: string;
  loadingCity: string;
  unloadingCity: string;
  truckType: string;
  trailerType: string;
  truckTypeOptions: string[];
  trailerTypeOptions: string[];
  sortOrder: string;
  onSearchChange: (value: string) => void;
  onLoadingCityChange: (value: string) => void;
  onUnloadingCityChange: (value: string) => void;
  onTruckTypeChange: (value: string) => void;
  onTrailerTypeChange: (value: string) => void;
  onClear: () => void;
  onSortOrderChange: (value: "desc" | "asc") => void;
};

export function CargoFilters({
  search,
  loadingCity,
  unloadingCity,
  truckType,
  trailerType,
  truckTypeOptions,
  trailerTypeOptions,
  sortOrder,
  onSearchChange,
  onLoadingCityChange,
  onUnloadingCityChange,
  onTruckTypeChange,
  onTrailerTypeChange,
  onClear,
  onSortOrderChange,
}: Props) {
  const { t } = useCargoI18n();

  return (
    <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder={t.filter.search}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Input
          placeholder={t.filter.loadingCity}
          value={loadingCity}
          onChange={(e) => onLoadingCityChange(e.target.value)}
        />
        <Input
          placeholder={t.filter.unloadingCity}
          value={unloadingCity}
          onChange={(e) => onUnloadingCityChange(e.target.value)}
        />

        <Select
          value={truckType || "all"}
          onValueChange={(value) => {
            onTruckTypeChange(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Truck type" />
          </SelectTrigger>

          <SelectContent className="border bg-white shadow-md">
            <SelectItem value="all">{t.cargo.allTruckTypes}</SelectItem>

            {truckTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={trailerType || "all"}
          onValueChange={(value) => {
            onTrailerTypeChange(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Trailer type" />
          </SelectTrigger>

          <SelectContent className="border bg-white shadow-md">
            <SelectItem value="all">{t.cargo.allTrailerTypes}</SelectItem>

            {trailerTypeOptions.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortOrder}
          onValueChange={(value) => onSortOrderChange(value as "desc" | "asc")}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>

          <SelectContent className="bg-white border shadow-md">
            <SelectItem value="desc">{t.sort.newest}</SelectItem>
            <SelectItem value="asc">{t.sort.oldest}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 flex justify-end">
        <Button variant="outline" onClick={onClear}>
          {t.filter.clearFilter}
        </Button>
      </div>
    </div>
  );
}
