export interface CType {
    id: number;
    cname: string;
    currency: string;
}

export interface CountryDataType {
  countries: CType[];
}