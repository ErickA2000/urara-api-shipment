export const brokers_kafka = getBrokers();

export const clientId_payment_kafka = process.env.KAFKA_CLIENT_ID_PAYMNET || "";

export const topic_payment_kafka = process.env.KAFKA_TOPIC_PAYMNET || "";

export const groupId_payment_kafka = process.env.KAFKA_GROUPID_PAYMNET || "";

export const clientId_shipment_kafka = process.env.KAFKA_CLIENT_ID_SHIPMENT || "";

export const topic_shipment_kafka = process.env.KAFKA_TOPIC_SHIPMENT || "";

export const aws = {
    userId: process.env.AWS_USERID || "",
    accessKey: process.env.AWS_ACCESS_KEY || "",
    secrectAccessKey: process.env.AWS_SECRECT_ACCESS_KEY || "",
    region: process.env.AWS_REGION || ""
};

function getBrokers(): string[]{
        
    const brokers = process.env.KAFKA_HOST;

    if( brokers != undefined ){
        let arrayBrokers = brokers.split(',');
        return arrayBrokers;

    }else{
        return ['kafka:9092']
    }
}