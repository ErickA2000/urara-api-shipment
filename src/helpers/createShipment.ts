import { envioDAO } from "@DAO/Envio.dao";

const createShipment = async ( idCliente: string ): Promise<void> => {
    try {
        
        const envio = await envioDAO.addShipment({
            idCliente,
            tokenServiEnvio: "",
            estado: "pendiente",
            paqueteria: "",
            montoEnvio: 0
        });

        

    } catch (error) {
        console.log("Algo va mal: ", error)
    }
}

export default createShipment;