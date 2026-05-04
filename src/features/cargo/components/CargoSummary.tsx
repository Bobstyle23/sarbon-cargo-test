import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  total: number;
  label: string;
};

export function CargoSummary({ total, label }: Props) {
  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>

          <Badge variant="secondary">SEARCHING_ALL</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
