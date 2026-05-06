import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Lang } from "../i18n/cargoDictionary";
import { useCargoI18n } from "../i18n/CargoI18nContext";

interface Props {
  title: string;
  subtitle: string;
}

export function CargoHeader({ title, subtitle }: Props) {
  const { lang, setLang } = useCargoI18n();
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-slate-500">{subtitle}</p>
      </div>

      <Select value={lang} onValueChange={(value) => setLang(value as Lang)}>
        <SelectTrigger className="w-[120px] bg-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent className="bg-white border shadow-md">
          <SelectItem value="uz">UZ</SelectItem>
          <SelectItem value="ru">RU</SelectItem>
          <SelectItem value="en">EN</SelectItem>
        </SelectContent>
      </Select>
    </header>
  );
}
