"use client";

import { useState } from "react";
import { useCargoList } from "@/features/cargo/hooks/useCargoList";
import { CargoHeader } from "@/features/cargo/components/CargoHeader";
import { CargoSummary } from "@/features/cargo/components/CargoSummary";
import { CargoList } from "@/features/cargo/components/CargoList";
import { CargoPagination } from "@/features/cargo/components/CargoPagination";
import { CargoState } from "@/features/cargo/components/CargoState";
import { CargoSkeleton } from "@/features/cargo/components/CargoSkeleton";
import { CargoFilters } from "@/features/cargo/components/CargoFilters";
import {
  CargoI18nProvider,
  useCargoI18n,
} from "@/features/cargo/i18n/CargoI18nContext";

export default function CargoPage() {
  return (
    <CargoI18nProvider>
      <CargoPageContent />
    </CargoI18nProvider>
  );
}

function CargoPageContent() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [search, setSearch] = useState("");
  const [loadingCity, setLoadingCity] = useState("");
  const [unloadingCity, setUnloadingCity] = useState("");
  const [truckType, setTruckType] = useState("");

  const hasActiveFilters = search || loadingCity || unloadingCity || truckType;

  const { lang, t } = useCargoI18n();
  const { data, isLoading, isError, refetch } = useCargoList({
    page: hasActiveFilters ? 1 : page,
    limit: hasActiveFilters ? 50 : limit,
    lang,
  });

  const cargos = data?.data.items ?? [];
  const total = data?.data.total ?? 0;

  const filteredCargos = cargos.filter((cargo) => {
    const loadPoint = cargo.route_points.find((point) => point.type === "LOAD");
    const unloadPoint = cargo.route_points.find(
      (point) => point.type === "UNLOAD",
    );

    const searchValue = search.toLowerCase().trim();
    const loadingCityValue = loadingCity.toLowerCase().trim();
    const unloadingCityValue = unloadingCity.toLowerCase().trim();
    const truckTypeValue = truckType.toLowerCase().trim();

    const searchableText = [
      cargo.name,
      cargo.contact_name,
      cargo.contact_phone,
      cargo.cargo_type?.name_uz,
      cargo.cargo_type?.name_ru,
      cargo.cargo_type?.name_en,
      cargo.truck_type,
      cargo.trailer_plate_type,
      loadPoint?.city_name,
      loadPoint?.address,
      unloadPoint?.city_name,
      unloadPoint?.address,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchValue
      ? searchableText.includes(searchValue)
      : true;

    const matchesLoadingCity = loadingCityValue
      ? loadPoint?.city_name.toLowerCase().includes(loadingCityValue)
      : true;

    const matchesUnloadingCity = unloadingCityValue
      ? unloadPoint?.city_name.toLowerCase().includes(unloadingCityValue)
      : true;

    const matchesTruckType = truckTypeValue
      ? cargo.truck_type?.toLowerCase().includes(truckTypeValue)
      : true;

    return (
      matchesSearch &&
      matchesLoadingCity &&
      matchesUnloadingCity &&
      matchesTruckType
    );
  });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setLoadingCity("");
    setUnloadingCity("");
    setTruckType("");
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleLoadingCityChange = (value: string) => {
    setLoadingCity(value);
    setPage(1);
  };

  const handleUnloadingCityChange = (value: string) => {
    setUnloadingCity(value);
    setPage(1);
  };

  const handleTruckTypeChange = (value: string) => {
    setTruckType(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CargoHeader title={t.title} subtitle={t.subtitle} />

        {isLoading && <CargoSkeleton />}

        {isError && (
          <CargoState
            type="error"
            message={t.error}
            retryLabel={t.retry}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && (
          <>
            <CargoSummary total={total} label={t.total} />
            <CargoFilters
              search={search}
              loadingCity={loadingCity}
              unloadingCity={unloadingCity}
              truckType={truckType}
              onSearchChange={handleSearchChange}
              onLoadingCityChange={handleLoadingCityChange}
              onUnloadingCityChange={handleUnloadingCityChange}
              onTruckTypeChange={handleTruckTypeChange}
              onClear={handleClearFilters}
            />

            {filteredCargos.length === 0 ? (
              <CargoState type="empty" message={t.empty} />
            ) : (
              <>
                <CargoList cargos={filteredCargos} />

                {!hasActiveFilters && (
                  <CargoPagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={setPage}
                    onLimitChange={handleLimitChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
