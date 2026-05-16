import type { IncomingMessage, ServerResponse } from "node:http";
import { serviceData, writeCountryData } from "../service/serviceData";
import type { CType } from "../types/dataTypes";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../routes/sendResponse";

export const CountryController = (req: IncomingMessage, res: ServerResponse) => {
    const countryData = serviceData();
    console.log(countryData);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(countryData));
    
}

export const SingaleCountryController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url 

    const urlparse = url?.split("/").pop();

    const countryData = serviceData();

    const singaleCountry = countryData.countries.find((c : CType) => c.id === Number(urlparse));

    if(singaleCountry){
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(singaleCountry));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Country not found" }));
    }
    console.log(singaleCountry);
}


export const CreateCountryController = async(req: IncomingMessage,res: ServerResponse) => {
    const body = await parseBody(req);
    const countryData = serviceData();

    const newCountry: CType = {
        id: countryData.countries.length + 1,
        cname: body.cname,
        currency: body.currency
    }

    countryData.countries.push(newCountry);
    writeCountryData(countryData);

    sendResponse(res, 201, true, "Country created successfully", newCountry);
}

export const UpdateCountryController = async(req: IncomingMessage,res: ServerResponse) => {
    const url = req.url     
    const urlparse = url?.split("/").pop();

    const body = await parseBody(req);
    const countryData = serviceData();

    const countryIndex = countryData.countries.findIndex((c: CType) => c.id === Number(urlparse));

    if (countryIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Country not found" }));
        return;
    }

    countryData.countries[countryIndex] = { ...countryData.countries[countryIndex], ...body };
    writeCountryData(countryData);
    
    sendResponse(res, 200, true, "Country updated successfully", countryData.countries[countryIndex]);
}

export const DeleteCountryController = (req: IncomingMessage,res: ServerResponse) => {
    const url = req.url     
    const urlparse = url?.split("/").pop();
    const countryData = serviceData();

    const countryIndex = countryData.countries.findIndex((c: CType) => c.id === Number(urlparse));
    
    if (countryIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Country not found" }));
        return;
    }

    countryData.countries.splice(countryIndex, 1);
    writeCountryData(countryData);

    sendResponse(res, 200, true, "Country deleted successfully");
}