import { Ienvio, IenvioAdd } from "@Interfaces/envio.interface";
import Envio from "@Models/Envio";
import { PaginateResult } from "mongoose";

class EnvioDAO{

    async getAll(): Promise<Ienvio[]>{
        return new Promise( (resolve, reject) => Envio
            .find()
            .populate({ path: "idCliente", select: "nombre"})
            .exec( (err, docs) => {
                if (err) return reject(err);
                return resolve(docs);
            } )
        )
    }

    async getAllPaginate( page: number, limit: number ): Promise<PaginateResult<Ienvio>>{
        const options = {
            populate: [{path: "idCliente", select: "nombre"}],
            page,
            limit
        };

        return new Promise( (resolve, reject) => Envio
            .paginate({}, options, (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        )
    }

    async getOneByCliente( id_cliente: string ): Promise<Ienvio> {
        return new Promise( (resolve, reject) => Envio
            .findOne({ idCliente: id_cliente })
            .populate({ path: "idCliente", select: "nombre" })
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs!);
            })
        )
    }

    async addShipment( shipment: IenvioAdd ): Promise<Ienvio[]>{
        return new Promise( (resolve, reject) => Envio
            .insertMany( shipment, (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        )
    }

    async updateShipment( id: string, shipment: IenvioAdd ): Promise<Ienvio> {
        return new Promise( (resolve, reject) => Envio
            .findByIdAndUpdate( id, shipment, 
                {
                    new: true
                },
                (err, docs) => {
                    if(err) return reject(err);
                    return resolve(docs!);
                }
            )
        )
    }

}

export const envioDAO = new EnvioDAO();