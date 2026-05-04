import { api } from "@/shared/api/axios";

export type CargoQueryParams = {
  page: number;
  limit: number;
};

export type Cargo = {
  id: string;
  [key: string]: unknown;
};

export type CargoResponse = {
  data?: Cargo[];
  total?: number;
  page?: number;
  limit?: number;
};

export async function getCargoList(params: CargoQueryParams) {
  const { data } = await api.get<CargoResponse>("/dispatchers/cargo/all", {
    params: {
      page: params.page,
      limit: params.limit,
      sort: "created_at:desc",
      status: "SEARCHING_ALL",
    },
  });

  return data;
}
