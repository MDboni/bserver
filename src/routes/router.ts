import type { IncomingMessage, ServerResponse } from "http";
import { CountryController, CreateCountryController, DeleteCountryController, SingaleCountryController, UpdateCountryController } from "../controller/countryController";


export const mainRouter = (req: IncomingMessage, res:ServerResponse) => {
    const { url, method } = req;

    if (url === "/hello" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, World!\n");
    } else if(url === "/country" && method === "GET") {
        CountryController(req, res);
    } else if (url?.startsWith("/country/") && method === "GET") {
        SingaleCountryController(req, res);
    }else if(url === "/country" && method === "POST") {
        CreateCountryController(req, res);
    }else if(url?.startsWith("/country/") && method === "PUT") {
        UpdateCountryController(req, res);
    }else if(url?.startsWith("/country/") && method === "DELETE") {
        DeleteCountryController(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found\n");
    }
}