import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  type: "loading" | "error" | "empty";
  onRetry?: () => void;
};

export function CargoState({ type, onRetry }: Props) {
  const content = {
    loading: "Yuklanmoqda...",
    error: "Ma’lumotlarni yuklashda xatolik yuz berdi.",
    empty: "Cargo topilmadi.",
  };

  return (
    <Card>
      <CardContent className="p-8 text-center">
        <p className={type === "error" ? "text-red-600" : "text-slate-600"}>
          {content[type]}
        </p>

        {type === "error" && onRetry && (
          <Button className="mt-4" onClick={onRetry}>
            Qayta urinish
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
