import path from "path";
import fs from "fs";
import type { CountryDataType } from "../types/dataTypes";

const filepath = path.join(process.cwd(), "./src/database/db.json");

export const serviceData = () => {

    const countryy = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(countryy);
}

export const writeCountryData = (data: CountryDataType) => {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
};