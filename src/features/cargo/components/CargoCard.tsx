import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Cargo } from "../api/cargoApi";

type Props = {
  cargo: Cargo;
};

function formatDate(date?: string) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function CargoCard({ cargo }: Props) {
  const loadPoint = cargo.route_points.find((point) => point.type === "LOAD");
  const unloadPoint = cargo.route_points.find(
    (point) => point.type === "UNLOAD",
  );

  const price = cargo.payment?.total_amount
    ? `${cargo.payment.total_amount.toLocaleString()} ${cargo.payment.total_currency}`
    : "Kelishiladi";

  return (
    <Card className="overflow-hidden border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-0">
        <div className="border-l-4 border-l-blue-600 p-4 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="line-clamp-2 text-lg font-semibold text-slate-950">
                    {cargo.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {cargo.cargo_type?.name_uz ?? "Cargo turi ko‘rsatilmagan"}
                  </p>
                </div>

                <Badge className="w-fit" variant="secondary">
                  {cargo.status}
                </Badge>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-400">
                      Yuklash
                    </p>
                    <p className="font-semibold text-slate-900">
                      {loadPoint?.city_name ?? "Noma’lum"}
                    </p>
                    <p className="line-clamp-1 text-sm text-slate-500">
                      {loadPoint?.address ?? "-"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(loadPoint?.date)}
                    </p>
                  </div>

                  <div className="hidden h-px w-12 bg-slate-300 md:block" />

                  <div>
                    <p className="text-xs font-medium uppercase text-slate-400">
                      Tushirish
                    </p>
                    <p className="font-semibold text-slate-900">
                      {unloadPoint?.city_name ?? "Noma’lum"}
                    </p>
                    <p className="line-clamp-1 text-sm text-slate-500">
                      {unloadPoint?.address ?? "-"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(unloadPoint?.date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 text-sm md:grid-cols-4">
                <Info label="Og‘irlik" value={`${cargo.weight ?? "-"} t`} />
                <Info label="Hajm" value={`${cargo.volume ?? "-"} m³`} />
                <Info label="Truck" value={cargo.truck_type ?? "-"} />
                <Info label="Trailer" value={cargo.trailer_plate_type ?? "-"} />
              </div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4 lg:min-w-52 lg:text-right">
              <p className="text-xs text-slate-500">Narx</p>
              <p className="text-2xl font-bold text-slate-950">{price}</p>

              <div className="mt-4 border-t pt-4">
                <p className="text-xs text-slate-500">Kontakt</p>
                <p className="font-medium text-slate-900">
                  {cargo.contact_name ?? "-"}
                </p>
                <p className="text-sm text-slate-500">
                  {cargo.contact_phone ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  );
}
