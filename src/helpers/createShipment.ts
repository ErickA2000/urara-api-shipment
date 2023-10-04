import { envioDAO } from "@DAO/Envio.dao";
import ProducerFactory from "@Services/kafkaProducer";

const createShipment = async ( idCliente: string, idCompra: string ): Promise<void> => {
    try {
        const producer = new ProducerFactory();
        await producer.start();
        
        const envio = await envioDAO.addShipment({
            idCliente,
            tokenServiEnvio: "",
            estado: "pendiente",
            paqueteria: "",
            montoEnvio: 0
        });

        //enviando mensaje sobre envio
        await producer.sendBatch( [ { idEnvio: envio[0]._id, idCompra } ] );
        await producer.shutdown();

    } catch (error) {
        console.log("Algo va mal: ", error)
    }
}

export default createShipment;