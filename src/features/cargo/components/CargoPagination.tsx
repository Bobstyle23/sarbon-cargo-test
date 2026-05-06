import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCargoI18n } from "../i18n/CargoI18nContext";

type Props = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function CargoPagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: Props) {
  const { t } = useCargoI18n();
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">{t.pagination.limit}:</span>

        <Select
          value={String(limit)}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-white border shadow-md">
            {/*for testing the pagination in case limited cargo count*/}
            {/*<SelectItem value="1">1</SelectItem>*/}
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          {t.pagination.previous}
        </Button>

        <p className="min-w-20 text-center text-sm text-slate-600">
          {t.pagination.page} {page} / {totalPages || 1}
        </p>

        <Button
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          {t.pagination.next}
        </Button>
      </div>
    </div>
  );
}
