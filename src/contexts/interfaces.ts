import { announceResponse } from "@/schemas/announce.schema";

export interface KenzieCar {
  id: string,
  name: string,
  brand: string,
  year: string,
  fuel: number,
  value: number
}

export const Brand = {
  CHEVROLET: "chevrolet",
  CITROEN: "citroen",
  FIAT: "fiat",
  FORD: "ford",
  HONDA: "honda",
  HYUNDAI: "hyundai",
  NISSAN: "nissan",
  PEUGEOT: "peugeot",
  RENAULT: "renault",
  TOYOTA: "toyota",
  VOLKSWAGEN: "volkswagen",
} as const;

export interface GetAnnouncesData {
  data: announceResponse[];
  prevPage?: string;
  nextPage?: string;
  currentPage: number;
  totalPages: number;
}

export interface SellerContextData {
  announce: announceResponse | null;
  getAnnounce: (id: number) => void;
  announcesSeller: GetAnnouncesData;
  getAnnouncesSeller: (id?: number, url?: string) => void;
  kenzieCars: Array<KenzieCar>;
  listCarsByBrand: (brand: string) => Promise<void>;
  getCarFIPE: (car: KenzieCar) => Promise<void>;
  carFIPE: number;
  kenzieCarSelected: KenzieCar,
  setKenzieCarSelected: React.Dispatch<React.SetStateAction<KenzieCar>>
}

export type CarByBrand = {
  [key in EnumBrand]: KenzieCar[];
};

export enum EnumBrand {
  CHEVROLET = "chevrolet",
  CITROEN = "citroen",
  FIAT = "fiat",
  FORD = "ford",
  HONDA = "honda",
  HYUNDAI = "hyundai",
  NISSAN = "nissan",
  PEUGEOT = "peugeot",
  RENAULT = "renault",
  TOYOTA = "toyota",
  VOLKSWAGEN = "volkswagen",
}
