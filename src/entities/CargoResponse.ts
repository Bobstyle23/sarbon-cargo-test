import { Cargo } from "./Cargo";

export interface CargoResponse {
  status: string;
  code: number;
  description: string;
  data: {
    items: Cargo[];
    total: number;
  };
}
