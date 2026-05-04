import { useQuery } from "@tanstack/react-query";
import { getCargoList, type CargoQueryParams } from "../api/cargoApi";

export function useCargoList(page: number, limit: number) {
  return useQuery({
    queryKey: ["cargo-list", page, limit],
    queryFn: () => getCargoList({ page, limit }),
  });
}
