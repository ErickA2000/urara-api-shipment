import { CODES_HTTP } from "@Constants/global";
import { envioDAO } from "@DAO/Envio.dao";
import { Request, Response } from "express";

class EnvioController{

    public async getAll( req: Request, res: Response) {
        try {
            const envios = await envioDAO.getAll();
            res.status(CODES_HTTP.OK).json({
                success: true,
                data: envios
            })
        } catch (error) {
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error
            })
        }
    }

    public async getAllPaginate( req: Request, res: Response){
        const limit: number = req.query.limit as unknown as number || 5;
        const page: number = req.query.page as unknown as number || 1;

        try {
            const envios = await envioDAO.getAllPaginate(page, limit);
            res.status(CODES_HTTP.OK).json({
                success: true,
                data: envios
            })
        } catch (error) {
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error
            })
        }
    } 

    public async getEnvioByCliente( req: Request, res: Response){
        try {
            const envio = await envioDAO.getOneByCliente( req.userId );

            res.status(CODES_HTTP.OK).json({
                success: true,
                data: envio
            })
        } catch (error) {
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error
            })
        }
    }

}

export const envioController = new EnvioController();