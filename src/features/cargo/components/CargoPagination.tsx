import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  page: number;
  limit: number;
  itemsLength: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export function CargoPagination({
  page,
  limit,
  itemsLength,
  onPageChange,
  onLimitChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Limit:</span>

        <Select
          value={String(limit)}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
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
          Previous
        </Button>

        <p className="min-w-20 text-center text-sm text-slate-600">
          Page {page}
        </p>

        <Button
          variant="outline"
          disabled={itemsLength < limit}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
