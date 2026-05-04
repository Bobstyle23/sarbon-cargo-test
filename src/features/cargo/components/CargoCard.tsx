import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Cargo } from "../api/cargoApi";

type Props = {
  cargo: Cargo;
};

export function CargoCard({ cargo }: Props) {
  const loadPoint = cargo.route_points.find((point) => point.type === "LOAD");
  const unloadPoint = cargo.route_points.find(
    (point) => point.type === "UNLOAD",
  );

  return (
    <Card className="overflow-hidden">
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
}
