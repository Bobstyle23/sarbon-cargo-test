import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Lang } from "../i18n/cargoDictionary";

interface Props {
  title: string;
  subtitle: string;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function CargoHeader({ title, subtitle, lang, onLangChange }: Props) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-slate-500">{subtitle}</p>
      </div>

      <Select
        value={lang}
        onValueChange={(value) => onLangChange(value as Lang)}
      >
        <SelectTrigger className="w-[120px] bg-white">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="uz">UZ</SelectItem>
          <SelectItem value="ru">RU</SelectItem>
          <SelectItem value="en">EN</SelectItem>
        </SelectContent>
      </Select>
    </header>
  );
}
