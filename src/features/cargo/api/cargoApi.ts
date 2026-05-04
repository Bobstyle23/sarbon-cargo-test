import { api } from "@/shared/api/axios";
import type { Lang } from "../i18n/cargoDictionary";
import { mockCargoResponse } from "./mockCargo";

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
  try {
    const { data } = await api.get<CargoResponse>("/dispatchers/cargo/all", {
      params: {
        page: params.page,
        limit: 1,
        sort: "created_at:desc",
        status: "SEARCHING_ALL",
      },
      headers: {
        "X-Language": params.lang,
      },
    });

    return data;
  } catch (error) {
    console.warn("API unavailable, using mock data", error);

    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;

    return {
      ...mockCargoResponse,
      data: {
        ...mockCargoResponse.data,
        items: mockCargoResponse.data.items.slice(start, end),
      },
    };
  }
}
