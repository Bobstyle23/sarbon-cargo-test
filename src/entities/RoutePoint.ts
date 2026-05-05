export interface RoutePoint {
  id: string;
  type: "LOAD" | "UNLOAD";
  city_name: string;
  country_code: string;
  address: string;
  date: string;
}
