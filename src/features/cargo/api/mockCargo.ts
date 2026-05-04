import type { CargoResponse } from "./cargoApi";

export const mockCargoResponse: CargoResponse = {
  status: "success",
  code: 200,
  description: "Mock data",
  data: {
    total: 0,
    items: [],
  },
};
