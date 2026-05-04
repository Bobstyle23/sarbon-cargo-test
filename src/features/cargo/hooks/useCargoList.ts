import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCargoList, type CargoQueryParams } from "../api/cargoApi";

export function useCargoList(params: CargoQueryParams) {
  return useQuery({
    queryKey: ["cargo-list", params],
    queryFn: () => getCargoList(params),
    placeholderData: keepPreviousData,
  });
}
