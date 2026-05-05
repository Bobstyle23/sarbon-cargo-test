import { api } from "@/shared/api/axios";
import type { Lang } from "../i18n/cargoDictionary";
import { mockCargoResponse } from "./mockCargo";
import { CargoResponse } from "@/entities/CargoResponse";

export type CargoQueryParams = {
  page: number;
  limit: number;
  lang: Lang;
};

export async function getCargoList(params: CargoQueryParams) {
  try {
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
