"use client";

import { useState } from "react";
import { useCargoList } from "@/features/cargo/hooks/useCargoList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CargoPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const { data, isLoading, isError, refetch } = useCargoList(page, limit);

  const cargos = data?.data.items ?? [];
  const total = data?.data.total ?? 0;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <p className="text-slate-600">Yuklanmoqda...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 p-6">
        <Card>
          <CardContent className="p-6">
            <p className="mb-4 text-red-600">
              Ma’lumotlarni yuklashda xatolik yuz berdi.
            </p>
            <Button onClick={() => refetch()}>Qayta urinish</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Cargo ro‘yxati
          </h1>
          <p className="mt-1 text-slate-500">
            Dispatcher uchun yuklar ro‘yxati
          </p>
        </header>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Jami yuklar</p>
                <p className="text-2xl font-semibold">{total}</p>
              </div>

              <Badge variant="secondary">SEARCHING_ALL</Badge>
            </div>
          </CardContent>
        </Card>

        {cargos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-slate-600">Cargo topilmadi.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {cargos.map((cargo) => {
              const loadPoint = cargo.route_points.find(
                (point) => point.type === "LOAD",
              );
              const unloadPoint = cargo.route_points.find(
                (point) => point.type === "UNLOAD",
              );

              return (
                <Card key={cargo.id} className="overflow-hidden">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900">
                            {cargo.name}
                          </h2>
                          <p className="text-sm text-slate-500">
                            {cargo.cargo_type?.name_uz ?? "Cargo turi yo‘q"}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <Badge variant="outline">
                            {loadPoint?.city_name ?? "Noma’lum"}
                          </Badge>
                          <span className="text-slate-400">→</span>
                          <Badge variant="outline">
                            {unloadPoint?.city_name ?? "Noma’lum"}
                          </Badge>
                        </div>

                        <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-3">
                          <p>Og‘irlik: {cargo.weight ?? "-"} t</p>
                          <p>Hajm: {cargo.volume ?? "-"} m³</p>
                          <p>Truck: {cargo.truck_type ?? "-"}</p>
                        </div>
                      </div>

                      <div className="space-y-2 md:text-right">
                        <p className="text-xl font-bold text-slate-900">
                          {cargo.payment?.total_amount
                            ? `${cargo.payment.total_amount} ${cargo.payment.total_currency}`
                            : "Narx kelishiladi"}
                        </p>

                        <Badge>{cargo.status}</Badge>

                        <p className="text-sm text-slate-500">
                          {cargo.contact_name ?? "Kontakt yo‘q"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <p className="text-sm text-slate-600">Page {page}</p>

          <Button
            variant="outline"
            disabled={cargos.length < limit}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}
