import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  limit: number;
  itemsLength: number;
  onPageChange: (page: number) => void;
};

export function CargoPagination({
  page,
  limit,
  itemsLength,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <p className="text-sm text-slate-600">Page {page}</p>

      <Button
        variant="outline"
        disabled={itemsLength < limit}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
