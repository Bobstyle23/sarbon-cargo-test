import { CargoResponse } from "@/entities/CargoResponse";

export const mockCargoResponse: CargoResponse = {
  status: "success",
  code: 200,
  description: "Mock data",
  data: {
    total: 2,
    items: [
      {
        id: "c2105ea3-35fa-478a-8243-7ae408288926",
        name: "Mol go'shti",
        status: "SEARCHING_ALL",
        weight: 10,
        volume: 12,
        truck_type: "REFRIGERATOR",
        trailer_plate_type: "REEFER",
        contact_name: "John_Doe",
        contact_phone: "+998509090051",
        created_at: "2026-05-02T11:37:44.987493+05:00",
        comment: "no comment",

        shipment_type: "LTL",
        dimensions: null,
        packaging: null,
        packaging_amount: null,
        vehicles_amount: 1,
        vehicles_left: 1,
        loading_types: [],
        documents: {},
        photos: [],

        route_points: [
          {
            id: "load1",
            type: "LOAD",
            city_name: "Moscow",
            country_code: "RU",
            address: "Moscow, Begovoy District",
            date: "2026-05-04T09:00:00Z",
          },
          {
            id: "unload1",
            type: "UNLOAD",
            city_name: "Tashkent",
            country_code: "UZ",
            address: "Toshkent, Sag‘bon",
            date: "2026-05-15T09:00:00Z",
          },
        ],

        cargo_type: {
          name_uz: "Go‘sht mahsulotlari",
          name_ru: "Мясная продукция",
          name_en: "Meat products",
        },

        payment: {
          total_amount: 4400,
          total_currency: "USD",
          is_negotiable: false,
        },
      },

      {
        id: "7d67ff2d-dfef-43c2-b3c9-075c19049bdf",
        name: "Пшеница, Туркестан → Лахор",
        status: "SEARCHING_ALL",
        weight: 20,
        volume: 20,
        truck_type: "TENT",
        trailer_plate_type: "TENTED",
        contact_name: "NCM",
        contact_phone: "+998997965623",
        created_at: "2026-05-02T10:43:05.234124+05:00",
        comment: "no comment",

        shipment_type: "FTL",
        dimensions: "7x2x2",
        packaging: "BAG",
        packaging_amount: 120,
        vehicles_amount: 1,
        vehicles_left: 1,
        loading_types: ["TOP", "SIDE"],
        documents: { TIR: true },
        photos: ["/mock/photo1.jpg"],

        route_points: [
          {
            id: "load2",
            type: "LOAD",
            city_name: "Turkestan",
            country_code: "KZ",
            address: "Turkiston",
            date: "2026-05-23T21:00:00Z",
          },
          {
            id: "unload2",
            type: "UNLOAD",
            city_name: "Lahore",
            country_code: "PK",
            address: "Lahore",
            date: "2026-05-29T21:00:00Z",
          },
        ],

        cargo_type: {
          name_uz: "Don mahsulotlari",
          name_ru: "Зерно",
          name_en: "Grain",
        },

        payment: {
          total_amount: 1000,
          total_currency: "USD",
          is_negotiable: false,
        },
      },
    ],
  },
};
