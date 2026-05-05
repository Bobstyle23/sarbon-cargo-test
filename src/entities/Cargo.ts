import { RoutePoint } from "./RoutePoint";

export interface Cargo {
  id: string;
  name: string;
  status: string;
  weight: number | null;
  volume: number | null;
  truck_type: string | null;
  trailer_plate_type: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  created_at: string;
  route_points: RoutePoint[];
  cargo_type: {
    name_uz: string;
    name_ru: string;
    name_en: string;
  } | null;
  payment: {
    total_amount: number | null;
    total_currency: string | null;
    is_negotiable: boolean;
  } | null;
  shipment_type: string | null;
  dimensions: string | null;
  packaging: string | null;
  packaging_amount: number | null;
  vehicles_amount: number | null;
  vehicles_left: number | null;
  loading_types: string[];
  documents?: {
    TIR?: boolean;
  };
  photos: string[];
}
