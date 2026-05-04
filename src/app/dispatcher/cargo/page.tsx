"use client";
"use client";

import { useState } from "react";
import { useCargoList } from "@/features/cargo/hooks/useCargoList";
import { CargoHeader } from "@/features/cargo/components/CargoHeader";
import { CargoSummary } from "@/features/cargo/components/CargoSummary";
import { CargoList } from "@/features/cargo/components/CargoList";
import { CargoPagination } from "@/features/cargo/components/CargoPagination";
import { CargoState } from "@/features/cargo/components/CargoState";

export default function CargoPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const { data, isLoading, isError, refetch } = useCargoList(page, limit);

  const cargos = data?.data.items ?? [];
  const total = data?.data.total ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CargoHeader />

        {isLoading && <CargoState type="loading" />}

        {isError && <CargoState type="error" onRetry={() => refetch()} />}

        {!isLoading && !isError && (
          <>
            <CargoSummary total={total} />

            {cargos.length === 0 ? (
              <CargoState type="empty" />
            ) : (
              <>
                <CargoList cargos={cargos} />

                <CargoPagination
                  page={page}
                  limit={limit}
                  itemsLength={cargos.length}
                  onPageChange={setPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
