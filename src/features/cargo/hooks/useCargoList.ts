import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCargoList, type CargoQueryParams } from "../api/cargoApi";
import type { Lang } from "../i18n/cargoDictionary";

export function useCargoList(page: number, limit: number, lang: Lang) {
  return useQuery({
    queryKey: ["cargo-list", page, limit, lang],
    queryFn: () => getCargoList({ page, limit, lang }),
    placeholderData: keepPreviousData,
  });
}
