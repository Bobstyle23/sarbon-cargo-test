import { api } from "@/shared/api/axios";
import type { Lang } from "../i18n/cargoDictionary";

export type CargoQueryParams = {
  page: number;
  limit: number;
  lang: Lang;
};

type RoutePoint = {
  id: string;
  type: "LOAD" | "UNLOAD";
  city_name: string;
  country_code: string;
  address: string;
  date: string;
};

export type Cargo = {
  id: string;
  name: string;
  status: string;
  weight: number | null;
  volume: number | null;
  truck_type: string | null;
  trailer_plate_type: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  created_at: string;
  route_points: RoutePoint[];
  cargo_type: {
    name_uz: string;
    name_ru: string;
    name_en: string;
  } | null;
  payment: {
    total_amount: number | null;
    total_currency: string | null;
    is_negotiable: boolean;
  } | null;
};

export type CargoResponse = {
  status: string;
  code: number;
  description: string;
  data: {
    items: Cargo[];
    total: number;
  };
};

export async function getCargoList(params: CargoQueryParams) {
  const { data } = await api.get<CargoResponse>("/dispatchers/cargo/all", {
    params: {
      page: params.page,
      limit: params.limit,
      sort: "created_at:desc",
      status: "SEARCHING_ALL",
    },
    headers: {
      "X-Language": params.lang,
    },
  });

  return data;
}
