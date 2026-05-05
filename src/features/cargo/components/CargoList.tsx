import { Cargo } from "@/entities/Cargo";
import { CargoCard } from "./CargoCard";

type Props = {
  cargos: Cargo[];
};

export function CargoList({ cargos }: Props) {
  return (
    <div className="grid gap-4">
      {cargos.map((cargo) => (
        <CargoCard key={cargo.id} cargo={cargo} />
      ))}
    </div>
  );
}
