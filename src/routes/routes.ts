import { Router } from "express";
import envioRoutes from "./envio.routes";


class Routes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.use( '/shipment', envioRoutes );
    }
}

const routes = new Routes();
export default routes.router;