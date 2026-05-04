"use client";

import { useState } from "react";
import { useCargoList } from "@/features/cargo/hooks/useCargoList";
import { CargoHeader } from "@/features/cargo/components/CargoHeader";
import { CargoSummary } from "@/features/cargo/components/CargoSummary";
import { CargoList } from "@/features/cargo/components/CargoList";
import { CargoPagination } from "@/features/cargo/components/CargoPagination";
import { CargoState } from "@/features/cargo/components/CargoState";
import { CargoFilters } from "@/features/cargo/components/CargoFilters";

export default function CargoPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useCargoList(page, limit);

  const cargos = data?.data.items ?? [];
  const total = data?.data.total ?? 0;

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const filteredCargos = cargos.filter((cargo) => {
    const loadPoint = cargo.route_points.find((point) => point.type === "LOAD");
    const unloadPoint = cargo.route_points.find(
      (point) => point.type === "UNLOAD",
    );

    const searchableText = [
      cargo.name,
      cargo.contact_name,
      cargo.contact_phone,
      cargo.cargo_type?.name_uz,
      cargo.truck_type,
      loadPoint?.city_name,
      unloadPoint?.city_name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CargoHeader />

        {isLoading && <CargoState type="loading" />}

        {isError && <CargoState type="error" onRetry={() => refetch()} />}

        {!isLoading && !isError && (
          <>
            <CargoSummary total={total} />
            <CargoFilters
              search={search}
              onSearchChange={setSearch}
              onClear={() => setSearch("")}
            />

            {filteredCargos.length === 0 ? (
              <CargoState type="empty" />
            ) : (
              <>
                <CargoList cargos={filteredCargos} />

                <CargoPagination
                  page={page}
                  limit={limit}
                  itemsLength={filteredCargos.length}
                  onPageChange={setPage}
                  onLimitChange={handleLimitChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
