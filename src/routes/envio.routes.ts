import { envioController } from "@Controllers/envio.controller";
import { autenticacion } from "@Middlewares/index";
import { Router } from "express";

class EnvioRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    private config(): void{
        this.router.get('/', [ autenticacion.TokenValidation ], envioController.getAll);
        this.router.get("/p", [ autenticacion.TokenValidation ], envioController.getAllPaginate);
        this.router.get("/one", [ autenticacion.TokenValidation ], envioController.getEnvioByCliente);
    }

}

const envioRoutes = new EnvioRoutes();
export default envioRoutes.router;