import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Cargo } from "../api/cargoApi";
import {
  ArrowRight,
  Box,
  CircleDollarSign,
  Package,
  Phone,
  Ruler,
  Scale,
  Truck,
} from "lucide-react";

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

                  <div className="hidden items-center justify-center rounded-full bg-white p-2 shadow-sm md:flex">
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
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
              {cargo.loading_types?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {cargo.loading_types.map((type) => (
                    <Badge key={type} variant="outline">
                      {type}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="grid gap-3 text-sm md:grid-cols-2 lg:grid-cols-4">
                <Info
                  label="Og‘irlik"
                  value={`${cargo.weight ?? "-"} t`}
                  icon={<Scale className="h-4 w-4" />}
                />
                <Info
                  label="Hajm"
                  value={`${cargo.volume ?? "-"} m³`}
                  icon={<Box className="h-4 w-4" />}
                />
                <Info
                  label="Truck"
                  value={cargo.truck_type ?? "-"}
                  icon={<Truck className="h-4 w-4" />}
                />
                <Info
                  label="Trailer"
                  value={cargo.trailer_plate_type ?? "-"}
                  icon={<Truck className="h-4 w-4" />}
                />
                <Info
                  label="Shipment"
                  value={cargo.shipment_type ?? "-"}
                  icon={<Package className="h-4 w-4" />}
                />
                <Info
                  label="Dimensions"
                  value={cargo.dimensions ?? "-"}
                  icon={<Ruler className="h-4 w-4" />}
                />
                <Info
                  label="Packaging"
                  value={
                    cargo.packaging
                      ? `${cargo.packaging} · ${cargo.packaging_amount ?? "-"}`
                      : "-"
                  }
                  icon={<Package className="h-4 w-4" />}
                />
                <Info
                  label="Vehicles"
                  value={`${cargo.vehicles_left ?? "-"} / ${cargo.vehicles_amount ?? "-"}`}
                  icon={<Truck className="h-4 w-4" />}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {cargo.payment?.is_negotiable && (
                <Badge variant="secondary">Negotiable</Badge>
              )}

              {cargo.documents?.TIR && <Badge variant="outline">TIR</Badge>}

              {cargo.photos?.length > 0 && (
                <Badge variant="outline">{cargo.photos.length} photo</Badge>
              )}
            </div>

            <div className="rounded-xl border bg-slate-50 p-4 lg:min-w-52 lg:text-right">
              <p className="flex items-center gap-2 text-xs text-slate-500 lg:justify-end">
                <CircleDollarSign className="h-4 w-4" />
                Narx
              </p>
              <p className="text-2xl font-bold text-slate-950">{price}</p>
              <div className="mt-4 border-t pt-4">
                <p className="flex items-center gap-2 text-xs text-slate-500 lg:justify-end">
                  <Phone className="h-4 w-4" />
                  Kontakt
                </p>
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

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-slate-400">
        {icon}
        <p className="text-xs">{label}</p>
      </div>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}
